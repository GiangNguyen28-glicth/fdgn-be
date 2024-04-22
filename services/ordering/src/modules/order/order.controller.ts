import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Order } from '@fdgn/share-domain';

import { OrderService } from './order.service';

@ApiTags(Order.name)
@Controller(Order.name.toLowerCase())
export class OrderController {
  constructor(private orderService: OrderService) {}
}
