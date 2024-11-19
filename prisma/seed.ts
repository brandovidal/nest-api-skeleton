// prisma/seed.ts
import { Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

// initialize the Prisma Client
const prisma = new PrismaClient()

const ROUNDS_OF_HASHING = 10

async function main() {
  const logger = new Logger('Seed')

  // create two dummy users
  const passwordAdmin = await bcrypt.hash('admin', ROUNDS_OF_HASHING)
  const passwordUser = await bcrypt.hash('user', ROUNDS_OF_HASHING)

  const user1 = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      password: passwordAdmin
    },
    create: {
      username: 'admin',
      email: 'admin@email.com',
      name: 'Admin',
      password: passwordAdmin
    }
  })

  const user2 = await prisma.user.upsert({
    where: { username: 'user' },
    update: {
      password: passwordUser
    },
    create: {
      username: 'user',
      email: 'user@email.com',
      name: 'User',
      password: passwordUser
    }
  })

  logger.log({ user1, user2 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
