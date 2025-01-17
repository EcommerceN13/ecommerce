import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryRequest } from '../interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto implements CreateCategoryRequest {
  @ApiProperty({
    type: String,
    example: 'Phones',
    description: 'Category nomi berilishi shart',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    description: 'Image yuklanishi shart',
    required: true,
  })
  image: any;

  @ApiProperty({
    type: String,
    format: 'binary',
    description: 'Icon yuklanishi shart',
    required: true,
  })
  icon: any;
}
