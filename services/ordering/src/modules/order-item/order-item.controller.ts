import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderItem } from '@fdgn/share-domain';
import { OrderItemService } from './order-item.service';


@ApiTags(OrderItem.name)
@Controller(OrderItem.name.toLowerCase())
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}
}
