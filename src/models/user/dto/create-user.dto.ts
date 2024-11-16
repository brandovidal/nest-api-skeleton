import { createZodDto } from 'nestjs-zod'

import { object } from 'zod'
import { baseSchema } from '@/common/validations/schema.validation'

const schema = object({
  username: baseSchema.username,
  email: baseSchema.email,
  password: baseSchema.password,
  name: baseSchema.name.nullish(),
  role: baseSchema.role
})

export class CreateUserDto extends createZodDto(schema) {}
