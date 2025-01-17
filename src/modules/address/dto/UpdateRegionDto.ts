import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateRegionDto {
  @ApiProperty({
    description: 'Region name',
    example: 'Toshkent viloyati'
  })
  @IsString()
  @IsOptional()
  region_name: string;

  @ApiProperty({
    description: 'User ID',
    example: 1
  })
  @IsNumber()
  @IsOptional()
  user_id: number;
}