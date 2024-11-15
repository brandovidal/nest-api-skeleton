import { IsString } from 'class-validator';

export class BulkCreatePersonDto {
  @IsString()
  name: string;
}
