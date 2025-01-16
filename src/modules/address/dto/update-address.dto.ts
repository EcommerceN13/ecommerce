import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty({
    enum: ['REGION', 'CITY', 'DISTRICT'],
    required: false,
    description: 'Address type',
    example: 'CITY'
  })
  @IsEnum(['REGION', 'CITY', 'DISTRICT'])
  @IsOptional()
  type?: 'REGION' | 'CITY' | 'DISTRICT';

  @ApiProperty({
    type: Number,
    required: false,
    description: 'ID of the parent region',
    example: 1
  })
  @IsNumber()
  @IsOptional()
  region_id?: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'City name',
    example: 'Tashkent'
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Street name or additional address details',
    example: 'Amir Temur street'
  })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'ID of the user who owns this address',
    example: 1
  })
  @IsNumber()
  @IsOptional()
  user_id?: number;
}
