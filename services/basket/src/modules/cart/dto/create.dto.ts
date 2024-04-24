import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, isObject } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateItemToCartDTO {
  @IsNotEmpty()
  product_id: string;

  @Min(1)
  quantity: number;
}

export class CardDTO {
  @ApiProperty({ default: '4242424242424242' })
  @IsNotEmpty()
  number: string;

  @ApiProperty({ default: 10 })
  @IsNotEmpty()
  exp_month: number;

  @ApiProperty({ default: 2050 })
  @IsNotEmpty()
  exp_year: number;

  @ApiProperty({ default: '123' })
  @IsNotEmpty()
  cvc: string;

  @ApiProperty({ default: 'Giang Nguyen' })
  @IsNotEmpty()
  holder_name: string;

  @ApiProperty({ default: '123' })
  @IsNotEmpty()
  postal_code: string;
}

export class CheckOutDTO {
  @ApiProperty({ type: [CreateItemToCartDTO] })
  @IsNotEmpty()
  items: CreateItemToCartDTO[];

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CardDTO)
  card: CardDTO;

  @IsNotEmpty()
  user_id?: number;
}
