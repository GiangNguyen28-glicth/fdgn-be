export class SetPaidOrderStatusCommand {
    public order_id: number;
    constructor(order_id: number) {
      this.order_id = order_id;
    }
  }
  