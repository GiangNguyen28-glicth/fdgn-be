import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Resource } from '@fdgn/share-domain';

export class CreateResourceDTO implements Partial<Resource> {
  @ApiProperty()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional()
  description?: string;
}
