import { FastifyReply, onRequestAsyncHookHandler } from 'fastify'
import { FastifyDecoratedRequest } from './context'
import { TOKEN_SECRET } from './context'
import { sign, verify } from 'jsonwebtoken'
import { addDays, addHours, addMinutes } from 'date-fns'
import { Role, PrismaClient } from '@prisma/client'

export enum AuthAction {
  LOGIN,
  REGISTER
}

export type UserData = {
  userId: string
  siteRole: Role
  email: string
  login: string
  count: number
  remember: boolean
}

// Two different types of payloads for refresh and access tokens
type AccessData = Pick<UserData, 'userId' | 'siteRole' | 'email' | 'login'>
type RefreshData = Pick<UserData, 'userId' | 'remember'>

// Function that signs
function createToken(userOptions: AccessData | RefreshData, expiresIn: string) {
  return sign(userOptions, TOKEN_SECRET, {
    expiresIn
  })
}

function setToken(
  reply: FastifyReply,
  name: string,
  token: string,
  expires: Date
): void {
  reply.setCookie(name, token, {
    expires,
    httpOnly: true,
    secure: true,
    signed: true
  })
}

export function issueTokens(
  reply: FastifyReply,
  userData: UserData,
  authAction: AuthAction
): { refreshToken: string; accessToken: string; userId: string } {
  let expiresIn: string, expires: Date
  const { remember } = userData
  if (authAction === AuthAction.LOGIN) {
    if (remember) {
      expiresIn = '30d'
      expires = addDays(new Date(), 30)
    } else {
      expiresIn = '4h'
      expires = addHours(new Date(), 4)
    }
  } else {
    expiresIn = '7d'
    expires = addDays(new Date(), 7)
  }

  const { userId, login, email, siteRole } = userData

  const refreshData: RefreshData = {
    userId,
    remember
  }

  const accessData: AccessData = {
    userId,
    login,
    email,
    siteRole
  }

  const refreshToken = createToken(refreshData, expiresIn)
  const accessToken = createToken(accessData, '15min')

  setToken(reply, 'refresh-token', refreshToken, expires)
  setToken(reply, 'access-token', accessToken, addMinutes(new Date(), 15))
  return { refreshToken, accessToken, userId }
}

/**
 * Hook that should be run before every API request in order to
 * transform cookies, if present, into usable info available in
 * the request.
 * @param request the request object from fastify
 * @param reply the reply object from fastify
 */
export async function tokenHook(
  request: FastifyDecoratedRequest,
  reply: FastifyReply
): Promise<onRequestAsyncHookHandler> {
  // retrieve tokens from the request
  const signedRefreshToken = request.cookies['refresh-token']
  const signedAccessToken = request.cookies['access-token']

  // if we don't find any, continue onwards
  if (!signedRefreshToken && !signedAccessToken) return

  // if we have a valid access token, use the data inside.
  try {
    // check if the signature is valid
    const { valid, value: accessToken } =
      request.unsignCookie(signedAccessToken)
    if (!valid) return

    const data = verify(accessToken, TOKEN_SECRET) as UserData
    request.user = data
    return
  } catch {}

  // if we don't have a valid access token, check the validity of our
  // refresh token.
  try {
    // check if the signature is valid
    const unsignedRefreshToken = request.unsignCookie(signedRefreshToken)
    if (!unsignedRefreshToken.valid) return

    const refreshToken = unsignedRefreshToken.value
    const data = verify(refreshToken, TOKEN_SECRET) as UserData
    const prisma = new PrismaClient()
    const userCredentials = await prisma.userCredentials.findUnique({
      where: { projectOwnerId: data.userId },
      include: { projectOwner: true }
    })

    // if the refresh token has been invalidated server-side, return
    if (!userCredentials || userCredentials.count !== data.count) return

    const userData = {
      userId: data.userId,
      siteRole: data.siteRole,
      email: data.email,
      login: data.login,
      count: data.count,
      remember: data.remember
    }

    // reissue tokens
    issueTokens(reply, userData, AuthAction.LOGIN)
    request.user = userData
  } catch {}

  return
}
