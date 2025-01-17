import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

// Create DTO
export class CreateAddressDto {
  @ApiProperty({
    type: Number,
    required: false,
    description: 'ID of the parent region',
  })
  @IsNumber()
  @IsOptional()
  region_id?: number;

  @ApiProperty({
    enum: ['REGION', 'CITY', 'DISTRICT'],
    default: 'REGION',
    description: 'Address type',
  })
  @IsEnum(['REGION', 'CITY', 'DISTRICT'])
  type: 'REGION' | 'CITY' | 'DISTRICT';

  @ApiProperty({
    type: String,
    required: true,
    description: 'City name',
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
