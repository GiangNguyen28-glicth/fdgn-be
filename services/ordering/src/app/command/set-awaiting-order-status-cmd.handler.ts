import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { SetAwaitingValidationOrderStatusCommand } from './set-awaiting-order-status-cmd';
import { REPO } from '../../common';
import { IOrderRepo } from '../../domain';

@CommandHandler(SetAwaitingValidationOrderStatusCommand)
export class SetAwaitingValidationOrderStatusCommandHandler
  implements ICommandHandler<SetAwaitingValidationOrderStatusCommand>
{
  constructor(@Inject(REPO.ORDER) private orderRepo: IOrderRepo, private readonly publisher: EventPublisher) {}
  async execute(message: SetAwaitingValidationOrderStatusCommand): Promise<void> {
    const order = this.publisher.mergeObjectContext(
      await this.orderRepo.findOne({ filters: { id: message.order_id }, relations: ['order_items'] }),
    );
    if (!order) {
      throw new NotFoundException('Order Not Found !!!');
    }
    order.setAwaitingValidationStatus();
    order.commit();
    await this.orderRepo.save({ entity: order });
  }
}
