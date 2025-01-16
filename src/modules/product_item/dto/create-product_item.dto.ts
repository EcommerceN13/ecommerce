import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductItemDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id: number;
}
