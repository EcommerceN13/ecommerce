import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateCityDistrictDto {
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
    description: 'City/District name',
    example: 'Yunusobod tumani',
  })
  @IsString()
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
  user_id: number;
}