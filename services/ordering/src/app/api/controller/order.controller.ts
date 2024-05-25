import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CommandBus } from '@nestjs/cqrs';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  @Inject() private readonly commandBus: CommandBus;
}
