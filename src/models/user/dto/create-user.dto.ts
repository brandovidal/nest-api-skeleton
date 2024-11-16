import { createZodDto } from 'nestjs-zod'

import { object, string } from 'zod'

const createSchema = object({
  username: string({ required_error: 'Username is required' }),
  email: string(),
  password: string(),
})

export class CreateUserDto extends createZodDto(createSchema) {}
