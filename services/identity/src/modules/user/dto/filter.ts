import { ApiPropertyOptional } from '@nestjs/swagger';
import { FilterGetAll } from '@fdgn/common';
import { User } from '@fdgn/share-domain';
export class FilterGetAllUser extends FilterGetAll implements Partial<User> {
  @ApiPropertyOptional()
  name?: string;
}

export class FilterGetOneUser implements Partial<User> {
  id?: number;
  email?: string;
}
