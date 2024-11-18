import { baseSchema } from '@/common/validations/schema.validation'
import { createZodDto } from 'nestjs-zod'
import { object } from 'zod'

const schema = object({
  username: baseSchema.username.optional(),
  email: baseSchema.email,
  password: baseSchema.password,
  name: baseSchema.name.nullish(),
  role: baseSchema.role.optional()
})

export class SignUpDto extends createZodDto(schema) {}
