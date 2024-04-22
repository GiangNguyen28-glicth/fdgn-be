import { IsNotEmpty, Min } from 'class-validator';
export class CreateItemToCartDTO {
  @IsNotEmpty()
  product_id: string;

  @Min(1)
  quantity: number;
}
