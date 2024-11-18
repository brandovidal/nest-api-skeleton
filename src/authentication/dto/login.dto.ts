import { baseSchema } from '@/common/validations/schema.validation'
import { createZodDto } from 'nestjs-zod'
import { object } from 'zod'

const schema = object({
  email: baseSchema.email,
  password: baseSchema.password
})

export class LoginDto extends createZodDto(schema) {}
