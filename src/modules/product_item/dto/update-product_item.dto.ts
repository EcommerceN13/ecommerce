import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductItemDto } from './create-product_item.dto';

export class UpdateProductItemDto extends PartialType(CreateProductItemDto) {
  @ApiPropertyOptional({
    description: 'Mahsulot variatsiyasining narxi (ixtiyoriy)',
    example: 1100,
    type: Number,
    minimum: 0.01,
  })
  price?: number;

  @ApiPropertyOptional({
    description: 'Mahsulot tasviriga havola (ixtiyoriy)',
    example: 'https://example.com/images/new-product.jpg',
    type: String,
  })
  image?: string;

  @ApiPropertyOptional({
    description: 'Tegishli mahsulotning IDsi (ixtiyoriy)',
    example: 2,
    type: Number,
  })
  product_id?: number;
}

