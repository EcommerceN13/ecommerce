import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateProductItemDto {
  @ApiProperty({
    description: 'Mahsulot variatsiyasining narxi',
    example: 1050,
    type: Number,
    minimum: 0.01,
  })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @ApiProperty({
    example: 'https://example.com/images/product.jpg',
    description: 'Mahsulot tasviriga havola',
    format: 'binary',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Tegishli mahsulotning IDsi',
    example: 1,
    type: Number,
  })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumberString()
  product_id: number;

  @ApiProperty({
    description: 'Tegishli mahsulot rangini IDsi',
    example: 1,
    type: Number,
  })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  color_id: number;
}
