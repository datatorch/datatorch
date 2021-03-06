import { ApolloServer } from 'apollo-server-fastify'
import fastify from 'fastify'

import { createContext as context } from './context'
import { schema } from './schema'
import { logger } from './logger'
import { GRAPHQL_ENDPOINT } from './config'

/**
 * Creates Fastify server and registers all plugins, and hooks
 */
export const createApp = () => {
  const graphql = new ApolloServer({ schema, context })
  const app = fastify({ logger })

  app.register(graphql.createHandler({ cors: true, path: GRAPHQL_ENDPOINT }))

  return app
}
