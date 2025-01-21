import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  isNotEmpty,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';

export class CreateBannerDto {
  @IsOptional()
  product_id?: number;

  @IsOptional()
  category_id?: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: string;

  @IsString()
  name?: string;
}
