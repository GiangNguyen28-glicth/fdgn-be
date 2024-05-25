import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetStockRejectedOrderStatusCommand } from './set-rejected-stock.cmd';
import { REPO } from '../../common';
import { IOrderRepo } from '../../domain';

@CommandHandler(SetStockRejectedOrderStatusCommand)
export class SetStockRejectedOrderStatusCommandHandler implements ICommandHandler<SetStockRejectedOrderStatusCommand> {
  constructor(@Inject(REPO.ORDER) private orderRepo: IOrderRepo) {}
  async execute(command: SetStockRejectedOrderStatusCommand): Promise<void> {
    const order = await this.orderRepo.findOne({ filters: { id: command.order_id } });
    order.setCancelledStatusWhenStockIsRejected();
    await this.orderRepo.save({ entity: order });
  }
}
