import { ApiProperty } from '@nestjs/swagger'

import { User } from '@/models/user/entities/user.entity'

export class Auth {
  @ApiProperty()
  accessToken: string

  @ApiProperty()
  user: User
}
