import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { IResource, Permission } from '@fdgn/share-ecm';

export class CreateResourceDTO implements Partial<IResource> {
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
