import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { REPO } from '../../common';
import { IOrderRepo } from '../../domain';
import { SetPaidOrderStatusCommand } from './set-paid-order-status-cmd';

@CommandHandler(SetPaidOrderStatusCommand)
export class SetPaidOrderStatusCommandHandler implements ICommandHandler<SetPaidOrderStatusCommand> {
  constructor(@Inject(REPO.ORDER) private orderRepo: IOrderRepo, private readonly publisher: EventPublisher) {}
  async execute(message: SetPaidOrderStatusCommand): Promise<void> {
    try {
      const order = this.publisher.mergeObjectContext(
        await this.orderRepo.findOne({
          filters: { id: message.order_id },
          fields: ['id', 'status', 'order_items'],
          relations: ['order_items'],
        }),
      );
      if (!order) {
        throw new NotFoundException('Order Not Found !!!');
      }
      order.setPaidStatus();
      order.commit();
      await this.orderRepo.save({ entity: order });
    } catch (error) {
      throw error;
    }
  }
}
