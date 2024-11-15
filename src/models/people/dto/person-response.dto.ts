import { Expose } from 'class-transformer';

export class PersonResponseDto {
  @Expose()
  id: string;

  @Expose({ name: 'name' })
  nombre: string;
}
