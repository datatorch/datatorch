import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { ProjectOwner } from 'nexus-prisma'

export const ProjectOwnerQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('projectOwner', {
      type: 'ProjectOwner',
      args: {
        id: nonNull(stringArg())
      },
      resolve(_root, args, ctx) {
        return ctx.db.projectOwner.findUnique({ where: args })
      }
    })
  }
})

export const ProjectOwnerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createProjectOwner', {
      type: 'ProjectOwner',
      args: {
        email: nonNull(stringArg()),
        login: nonNull(stringArg()),
        name: nonNull(stringArg())
      },
      resolve(_root, args, ctx) {
        return ctx.db.projectOwner.create({
          data: args
        })
      }
    })
  }
})

interface NexusPrismaEntity {
  $name: string
  $description: string
  [prop: string]:
    | {
        type: unknown
        name: string
        description?: string
      }
    | any
}

const createObjectTypeFromPrisma = <Entity extends NexusPrismaEntity>(
  entity: Entity,
  properties: Array<Exclude<keyof Entity, '$name' | '$description'>>
) => {
  return objectType({
    name: entity.$name,
    description: entity.$description,
    definition(t) {
      for (const prop of properties) {
        const { name, type } = entity[prop]
        t.field(name, { type })
      }
    }
  })
}

export const NProjectOwner = createObjectTypeFromPrisma(ProjectOwner, [
  'id',
  'email',
  'name',
  'createdAt',
  'updatedAt',
  'disabled'
])
