import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'

export class UserAuth {
  @ApiProperty()
  username: string

  @ApiProperty()
  email: string

  @ApiProperty({ enum: Role })
  role: Role
}

export class Auth {
  @ApiProperty()
  accessToken: string

  user: UserAuth
}
