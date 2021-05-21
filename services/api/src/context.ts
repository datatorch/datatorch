import { ContextFunction, Context as ApolloContext } from 'apollo-server-core'
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@shared/db'

import jwt from 'jsonwebtoken'

type FastifyResponse = { request: FastifyRequest; reply: FastifyReply }
const db = new PrismaClient()
export interface Context extends ApolloContext {
  db: PrismaClient
  reply: FastifyReply
  request: FastifyRequest
  jwt: typeof jwt
  TOKEN_SECRET: string
}

export const TOKEN_SECRET = 'REPLACETHISWITHSOMETHINGELSE'

export const createContext: ContextFunction<FastifyResponse, Context> = ctx => {
  return { ...ctx, db, jwt, TOKEN_SECRET }
}
