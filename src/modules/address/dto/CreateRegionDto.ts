import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateRegionDto {
  @ApiProperty({
    description: 'Region name',
    example: 'Toshkent viloyati'
  })
  @IsString()
  region_name: string;

  @ApiProperty({
    description: 'User ID',
    example: 1
  })
  @IsNumber()
  user_id: number;
}