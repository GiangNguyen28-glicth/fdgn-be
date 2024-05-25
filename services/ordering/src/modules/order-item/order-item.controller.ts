import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderItemService } from './order-item.service';

@ApiTags('order-item')
@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}
}
