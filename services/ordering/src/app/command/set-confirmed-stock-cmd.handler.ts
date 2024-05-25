import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';

import { SetStockConfirmedOrderStatusCommand } from './set-confirmed-stock.cmd';
import { REPO } from '../../common';
import { IOrderRepo } from '../../domain';

@CommandHandler(SetStockConfirmedOrderStatusCommand)
export class SetStockConfirmedOrderStatusCommandHandler
  implements ICommandHandler<SetStockConfirmedOrderStatusCommand>
{
  constructor(@Inject(REPO.ORDER) private orderRepo: IOrderRepo, private readonly publisher: EventPublisher) {}
  async execute(message: SetStockConfirmedOrderStatusCommand): Promise<void> {
    try {
      const order = this.publisher.mergeObjectContext(
        await this.orderRepo.findOne({ filters: { id: message.order_id }, fields: ['id', 'status'] }),
      );
      if (!order) {
        throw new NotFoundException('Order Not Found !!!');
      }
      order.setStockConfirmedStatus();
      order.commit();
      await this.orderRepo.save({ entity: order });
    } catch (error) {
      throw error;
    }
  }
}
