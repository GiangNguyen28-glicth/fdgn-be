import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from '@fdgn/common';

import { Grant, Role } from '@fdgn/share-domain';

export class CreateRoleDTO implements Partial<Role> {
  @ApiProperty()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  grants?: Grant[];
}
