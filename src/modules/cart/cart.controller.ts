import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CartService } from "./cart.service";
import { Cart } from "./models";
import { CreateCartDto, UpdateCartDto } from "./dtos";

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly service: CartService) { }

    @Get()
    @ApiOperation({ summary: "Get all carts" })
    async getAllCarts(): Promise<Cart[]> {
        return this.service.getAllCarts()
    }

    @Get("/:id")
    @ApiOperation({ summary: "Get a single Cart by ID" })
    async getSingleCart(@Param("id") id: string): Promise<Cart> {
        return this.service.getSingleCart(+id);
    }

    @Post('/add')
    @ApiOperation({ summary: "Create a new cart" })
    async createCart(@Body() payload: CreateCartDto) {
        return this.service.createCart(payload);
    }

    @Put("/update/:id")
    @ApiOperation({ summary: "Update a cart by ID" })
    async updateCart(@Param("id") id: string, @Body() payload: UpdateCartDto) {
        return this.service.updateCart(+id, payload);
    }

    @Delete("/delete/:id")
    @ApiOperation({ summary: "Delete a cart by ID" })
    async deleteCart(@Param("id") id: string) {
        const deleted = await this.service.deleteCart(+id);
        if (!deleted) throw new NotFoundException(`Cart with ID ${id} not found`);
        return { message: "Cart deleted successfully" };
    }
}