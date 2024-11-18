// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

// initialize the Prisma Client
const prisma = new PrismaClient()

const ROUNDS_OF_HASHING = 10

async function main() {
  // create two dummy users
  const passwordLuis = await bcrypt.hash('password-luis', ROUNDS_OF_HASHING)
  const passwordSofia = await bcrypt.hash('password-sofia', ROUNDS_OF_HASHING)

  const user1 = await prisma.user.upsert({
    where: { username: 'luis' },
    update: {
      password: passwordLuis
    },
    create: {
      username: 'luis',
      email: 'luis@email.com',
      name: 'Luis',
      password: passwordLuis
    }
  })

  const user2 = await prisma.user.upsert({
    where: { username: 'sofia' },
    update: {
      password: passwordSofia
    },
    create: {
      username: 'sofia',
      email: 'sofia@email.com',
      name: 'Sofia',
      password: passwordSofia
    }
  })

  console.log({ user1, user2 })
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
