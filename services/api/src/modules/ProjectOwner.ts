import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { ProjectOwner } from 'nexus-prisma'
import argon2 from 'argon2'

export const ProjectOwnerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('register', {
      type: 'ProjectOwner',
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
        login: nonNull(stringArg()),
        password: nonNull(stringArg())
      },
      async resolve(_root, args, ctx) {
        const { name, email, login } = args
        const password = await argon2.hash(args.password)
        const projectOwner = await ctx.db.projectOwner.create({
          data: {
            name,
            type: 'USER',
            userCredentials: {
              create: {
                email,
                login,
                password
              }
            }
          }
        })
        const accessToken = ctx.jwt.sign(
          { id: projectOwner.id },
          ctx.TOKEN_SECRET,
          {
            expiresIn: '15min'
          }
        )
        const refreshToken = ctx.jwt.sign(
          { id: projectOwner.id },
          ctx.TOKEN_SECRET,
          { expiresIn: '1day' }
        )

        const accessTokenExpiration = new Date()
        accessTokenExpiration.setMinutes(
          accessTokenExpiration.getMinutes() + 15
        )
        const refreshTokenExpiration = new Date()
        refreshTokenExpiration.setDate(accessTokenExpiration.getDate() + 30)

        ctx.reply.setCookie('access-token', accessToken, {
          expires: accessTokenExpiration
        })

        ctx.reply.setCookie('refresh-token', refreshToken, {
          expires: refreshTokenExpiration
        })

        return projectOwner
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
  'name',
  'createdAt',
  'updatedAt',
  'disabled',
  'lastSeenAt',
  'type'
])
