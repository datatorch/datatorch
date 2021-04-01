import { Context as ApolloContext, ContextFunction } from 'apollo-server-core'
import { FastifyReply, FastifyRequest } from 'fastify'

export type Context = ApolloContext

type CreateContextFunction = ContextFunction<
  { request: FastifyRequest; reply: FastifyReply },
  Context
>

export const createContext: CreateContextFunction = ({ request, reply }) => {
  return {
    request,
    reply
  }
}
