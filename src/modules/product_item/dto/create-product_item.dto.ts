import { IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductItemDto {
  @ApiProperty({
    description: 'Mahsulot variatsiyasining narxi',
    example: 1050,
    type: Number,
    minimum: 0.01,
  })
  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @ApiProperty({
    description: 'Mahsulot tasviriga havola',
    example: 'https://example.com/images/product.jpg',
    type: String,
  })
  image: string;

  @ApiProperty({
    description: 'Tegishli mahsulotning IDsi',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumberString()
  product_id: number;
}
