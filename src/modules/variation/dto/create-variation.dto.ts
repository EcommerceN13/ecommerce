import { IsNotEmpty, IsString, IsPositive, IsNumber } from 'class-validator';

export class CreateVariationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  category_id: number;
}
