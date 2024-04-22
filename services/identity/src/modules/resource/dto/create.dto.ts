import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Permission, Resource, Role } from '@fdgn/share-domain';

export class CreateResourceDTO implements Partial<Resource> {
  @ApiProperty()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ type: 'enum', enum: Permission })
  permission?: Permission;

  @ApiProperty()
  roleIds?: string[];

  @ApiPropertyOptional()
  description?: string;
}
