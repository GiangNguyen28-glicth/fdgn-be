import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from '@fdgn/common';

import { Role, RoleType } from '@fdgn/share-domain';

export class CreateRoleDTO implements Partial<Role> {
  @ApiPropertyOptional({ type: 'enum', enum: RoleType })
  @IsNotEmpty()
  name: RoleType;

  @ApiPropertyOptional()
  description?: string;
}
