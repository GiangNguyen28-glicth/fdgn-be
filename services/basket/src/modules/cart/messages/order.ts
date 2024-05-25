import { CardDTO } from '../dto';

export interface IOrderCreated {
  products: IProductItem[];
  user_id: number;
  card: CardDTO;
}

export interface IProductItem {
  id: string;
  title: string;
  image_url: string;
  price: number;
  original_price: number;
}
