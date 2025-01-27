import { Attributes } from "sequelize";
import { CartItem } from "../models";
import { IsNumber, IsPositive } from "class-validator";

export class UpdateCartItemDto implements Partial<Attributes<CartItem>> {
    @IsNumber()
    @IsPositive()
    cart_id?: number;
  
    @IsNumber()
    @IsPositive()
    product_id?: number;
  
    @IsNumber()
    quantity?: number;
  
    @IsNumber()
    @IsPositive()
    price?: number;
}