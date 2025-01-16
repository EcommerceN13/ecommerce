import { IsNotEmpty, IsNumber, Min, IsPositive } from 'class-validator';
import { Attributes } from 'sequelize';

import { CartItem } from '../models';

// CreateCartItemDto
export class CreateCartItemDto implements Partial<Attributes<CartItem>> {
  @IsNotEmpty()
  @IsPositive()
  cart_id: number;

  @IsNotEmpty()
  @IsPositive()
  product_id: number;

  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsPositive()
  price: number;
}