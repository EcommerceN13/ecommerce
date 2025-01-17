import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCityDistrictDto {
  @ApiProperty({
    enum: ['CITY', 'DISTRICT'],
    description: 'Type of address',
  })
  @IsEnum(['CITY', 'DISTRICT'])
  type: 'CITY' | 'DISTRICT';

  @ApiProperty({
    description: 'Region ID',
    example: 1,
  })
  @IsNumber()
  region_id: number;

  @ApiProperty({
    description: 'City or District name',
    example: 'Toshkent shahri yoki Uchtepa tumani',
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    description: 'Street address',
    example: 'Minor street',
  })
  @IsString()
  street: string;

  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  user_id: number;
}
