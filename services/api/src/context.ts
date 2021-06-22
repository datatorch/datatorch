import { ContextFunction, Context as ApolloContext } from 'apollo-server-core'
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@shared/db'
import { UserData } from './tokens'

export type FastifyDecoratedRequest = FastifyRequest & { user: UserData }
type FastifyResponse = { request: FastifyDecoratedRequest; reply: FastifyReply }
const db = new PrismaClient()
export interface Context extends ApolloContext {
  db: PrismaClient
  reply: FastifyReply
  request: FastifyDecoratedRequest
}

export const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'default'

export const createContext: ContextFunction<FastifyResponse, Context> = ctx => {
  return { ...ctx, db }
}
