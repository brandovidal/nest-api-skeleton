import { createZodDto } from 'nestjs-zod'
import { Role } from '@prisma/client'

import { object, string, nativeEnum } from 'zod'

const schema = object({
  username: string({ required_error: 'Enter your username.', invalid_type_error: 'Validate your username.' })
    .trim()
    .min(3, { message: 'Enter 3 characters as minimum.' })
    .optional(),
  email: string({ required_error: 'Enter your email.', invalid_type_error: 'Validate your email.' })
    .trim()
    .min(5, { message: 'Enter 5 characters as minimum.' })
    .email({
      message: 'Enter a valid email.'
    })
    .optional(),
  password: string({ required_error: 'Enter your password.', invalid_type_error: 'Validate your password.' })
    .trim()
    .min(6, { message: 'Enter 6 characters as minimum.' })
    .optional(),
  name: string({ required_error: 'Enter your name.', invalid_type_error: 'Validate your name.' }).trim().nullish(),
  role: nativeEnum(Role).default(Role.USER)
})

export class UpdateUserDto extends createZodDto(schema) {}
