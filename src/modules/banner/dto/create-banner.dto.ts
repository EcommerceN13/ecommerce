import { IsNotEmpty, isNotEmpty, IsOptional, IsString, isString } from "class-validator";

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

    @IsOptional()
    image?: string; 

    @IsString()
    name?: string;
  }