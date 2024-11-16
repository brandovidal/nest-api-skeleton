import { createZodDto } from 'nestjs-zod'

import { object, string } from 'zod'

const createSchema = object({
  username: string({ required_error: 'Enter your username.', invalid_type_error: 'Validate your username.' })
    .trim()
    .min(3, { message: 'Enter 3 characters as minimum.' }),
  email: string({ required_error: 'Enter your email.', invalid_type_error: 'Validate your email.' })
    .trim()
    .min(5, { message: 'Enter 5 characters as minimum.' })
    .email({
      message: 'Enter a valid email.'
    }),
  password: string({ required_error: 'Enter your password.', invalid_type_error: 'Validate your password.' })
    .trim()
    .min(6, { message: 'Enter 6 characters as minimum.' }),
  name: string({ required_error: 'Enter your name.', invalid_type_error: 'Validate your name.' }).trim().nullish()
})

export class CreateUserDto extends createZodDto(createSchema) {}
