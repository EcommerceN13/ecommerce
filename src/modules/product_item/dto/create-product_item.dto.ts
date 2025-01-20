import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductItemDto {
  @ApiProperty({
    description: 'Mahsulot variatsiyasining narxi',
    example: 1050,
    type: Number,
    minimum: 0.01,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Mahsulot tasviriga havola',
    example: 'https://example.com/images/product.jpg',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Tegishli mahsulotning IDsi',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id: number;
}
