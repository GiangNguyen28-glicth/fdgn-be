import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from '@fdgn/common';

import { RoleType, IRole } from '@fdgn/share-ecm';

export class CreateRoleDTO implements Partial<IRole> {
  @ApiPropertyOptional({ type: 'enum', enum: RoleType })
  @IsNotEmpty()
  name: RoleType;

  @ApiPropertyOptional()
  description?: string;
}
