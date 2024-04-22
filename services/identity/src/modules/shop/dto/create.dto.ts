import { Shop } from '@fdgn/share-domain';
export class CreateShopDTO implements Partial<Shop> {
  name?: string;
}
