import { ApolloServer } from 'apollo-server-fastify'
import fastify from 'fastify'

import { createContext as context, TOKEN_SECRET } from './context'
import { schema } from './schema'
import cookie, { FastifyCookieOptions } from 'fastify-cookie'

const GRAPHQL_API = '/api/graphql'
const PORT = 4000

const createApp = async () => {
  const graphql = new ApolloServer({ schema, context })

  const app = fastify({ logger: true })
  app.register(graphql.createHandler({ path: GRAPHQL_API }))
  app.register(cookie, {
    secret: TOKEN_SECRET
  } as FastifyCookieOptions)
  return app
}

/**
 * Start API server on specified endpoint
 */
const startApp = async () => {
  const app = await createApp()
  try {
    await app.listen(PORT)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

startApp()
