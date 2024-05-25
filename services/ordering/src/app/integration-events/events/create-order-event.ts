export class CardInfo {
  number: string;

  exp_month: number;

  exp_year: number;

  cvc: string;

  holder_name: string;

  postal_code: string;
}

export class OrderItemDTO {
  id: string;
  title: string;
  image_url: string;
  price: number;
  original_price: number;
  quantity: number;
}

export class OrderCreatedEvent {
  products: OrderItemDTO[];
  user_id: number;
  user_name: string;
  card: CardInfo;
}
