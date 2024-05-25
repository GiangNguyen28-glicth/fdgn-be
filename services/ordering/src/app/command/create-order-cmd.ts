import { CardInfo, OrderCreatedEvent, OrderItemDTO } from '../integration-events';

export class OrderCreatedCommand {
  public products: OrderItemDTO[];
  public user_id: number;
  public user_name: string;
  public card: CardInfo;
  constructor(props: OrderCreatedEvent) {
    this.products = props.products;
    this.user_id = props.user_id;
    this.user_name = props.user_name;
    this.card = props.card;
  }
}
