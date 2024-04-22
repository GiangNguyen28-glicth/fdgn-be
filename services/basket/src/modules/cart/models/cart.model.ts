export class CartItem {
  shop_id: number;
  product_items: ProductItem[];
  constructor(shop_id: number, product_items: ProductItem[]) {
    this.shop_id = shop_id;
    this.product_items = product_items;
  }
}

export class ProductItem {
  product_id: string;
  quantity: number;
}
