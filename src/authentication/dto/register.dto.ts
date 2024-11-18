import { baseSchema } from '@/common/validations/schema.validation'
import { createZodDto } from 'nestjs-zod'
import { object } from 'zod'

const schema = object({
  username: baseSchema.username,
  password: baseSchema.password,
  email: baseSchema.email.optional(),
  name: baseSchema.name.nullish(),
  role: baseSchema.role.optional()
})

export class SignUpDto extends createZodDto(schema) {}
