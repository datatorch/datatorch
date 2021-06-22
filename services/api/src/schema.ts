import { applyMiddleware } from 'graphql-middleware'
import NexusPrismaScalars from 'nexus-prisma/scalars'
import { fieldAuthorizePlugin, makeSchema } from 'nexus'

import * as types from './modules/types'
import { join } from 'path'

export const schema = applyMiddleware(
  makeSchema({
    types: [types, NexusPrismaScalars],
    contextType: {
      module: join(__dirname, 'context.ts'),
      export: 'Context'
    },
    outputs: {
      schema: join(__dirname, 'generated', 'schema.graphql'),
      typegen: join(__dirname, 'generated', 'typing.ts')
    },
    sourceTypes: {
      modules: [{ module: '@shared/db', alias: 'prismaclient' }]
    },
    plugins: [fieldAuthorizePlugin()]
  })
)
