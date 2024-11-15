import { UseInterceptors } from '@nestjs/common';

import {
  ClassContrustor,
  EntityInterceptor,
} from '../serializers/entity.serializer';

export function Entity(dto: ClassContrustor) {
  return UseInterceptors(new EntityInterceptor(dto));
}
