import { IsNumber, IsOptional } from "class-validator";
import { UpdateLikeRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLikeDto implements UpdateLikeRequest {
    @ApiProperty({
        description: 'Foydalanuvchi ID raqami',
        example: 1,
        required: false,
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    user_id: number;

    @ApiProperty({
        description: 'Mahsulot ID raqami',
        example: 1,
        required: true,
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    product_id: number
}