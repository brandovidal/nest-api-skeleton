import { ApiProperty } from '@nestjs/swagger'
import { User, Prisma, Role } from '@prisma/client'

export type UserCreateInput = Prisma.UserCreateInput
export type UserUpdateInput = Prisma.UserUpdateInput

export { User }

export class UserEntity implements User {
  @ApiProperty()
  id: string

  @ApiProperty()
  username: string

  @ApiProperty()
  email: string

  password: string

  @ApiProperty()
  name: string | null

  @ApiProperty()
  role: Role

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
