import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum, IsOptional, IsNumberString } from "class-validator";
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
    @IsNumberString()
    category_id: number;

    @ApiProperty({
        type: String,
        required: true,
        example: 'Detailed description of the product',
    })
    @IsString()
    description: string;

    @ApiProperty({
        enum: ['3 oy', '6 oy', '12 oy'],
        required: true,
    })
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
    @IsNumberString()
    price: number;

    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
    })
    @IsNumberString()
    brand_id: number;

    @ApiProperty({
        type: String,
        format: 'binary',
        required: false,
    })
    @IsOptional()
    image?: string;
}