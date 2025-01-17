import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum, IsOptional } from "class-validator";
import { CreateProductRequest } from "../interfaces/create-product.interface";

export class CreateProductDto implements Omit<CreateProductRequest, "image"> {
    @ApiProperty({
        type: String,
        required: true,
        example: 'iPhone 13 Pro',
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
    })
    @IsNumber()
    category_id: number;

    @ApiProperty({
        type: String,
        required: true,
        example: 'Detailed description of the product',
    })
    @IsString()
    description: string;

    @ApiProperty({
        enum: ['Tolangan', 'Tolanmagan', 'On proccess'],
        required: true,
    })
    @IsEnum(['Tolangan', 'Tolanmagan', 'On proccess'])
    nasiya: 'Tolangan' | 'Tolanmagan' | 'On proccess';

    @ApiProperty({
        type: String,
        required: true,
        example: 'Brief summary of the product',
    })
    @IsString()
    summary: string;

    @ApiProperty({
        type: Number,
        required: true,
        example: 999,
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
    })
    @IsNumber()
    brand_id: number;

    @ApiProperty({
        type: String,
        format: 'binary',
        required: false,
    })
    @IsOptional()
    image?: string;
}