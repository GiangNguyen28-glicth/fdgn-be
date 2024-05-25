import { ApiPropertyOptional } from '@nestjs/swagger';
import { FilterGetAll } from '@fdgn/common';
import { IUser } from '@fdgn/share-ecm';
export class FilterGetAllUser extends FilterGetAll implements Partial<IUser> {
  @ApiPropertyOptional()
  name?: string;
}

export class FilterGetOneUser implements Partial<IUser> {
  id?: number;
  email?: string;
}
