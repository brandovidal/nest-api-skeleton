import { createZodDto } from 'nestjs-zod'

import { object } from 'zod'
import { baseSchema } from '@/common/validations/schema.validation'

const schema = object({
  email: baseSchema.email.optional(),
  password: baseSchema.password.optional(),
  name: baseSchema.name.optional(),
  role: baseSchema.role.optional()
})

export class UpdateUserDto extends createZodDto(schema) {}
