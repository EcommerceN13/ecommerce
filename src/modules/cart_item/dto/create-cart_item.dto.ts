import { IsNotEmpty, IsNumber, Min, IsPositive, IsOptional, IsDate } from 'class-validator';

// create-cart-item.dto.ts
export class CreateCartItemDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    cart_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    product_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
    
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;
}