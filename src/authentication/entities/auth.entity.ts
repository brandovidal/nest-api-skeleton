import { ApiProperty } from '@nestjs/swagger'

import { UserEntity } from '@/models/user/entities/user.entity'

export class Auth {
  @ApiProperty()
  accessToken: string

  @ApiProperty()
  user: UserEntity
}
