import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./models";
import { ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateProductDto, UpdateProductDto } from "./dto";

@ApiTags('Products')
@Controller('products')
export class ProductController {
    #_service: ProductService;
    constructor(service: ProductService) { this.#_service = service; }

    @ApiOperation({ summary: 'Get all products' })
    @Get()
    async getAllProducts(): Promise<Product[]> {
        return await this.#_service.getAllProducts();
    }

    @ApiOperation({ summary: 'Get single product' })
    @Get('/:id')
    async getSingleProduct(@Param('id') id: string): Promise<Product> {
        return await this.#_service.getSingleProduct(+id);
    }

    @ApiOperation({ summary: "Create product" })
    @ApiConsumes('multipart/form-data')
    @Post('/add')
    @UseInterceptors(FileInterceptor('image'))
    async createProduct(
        @Body() createProductPayload: CreateProductDto,
        @UploadedFile() image: Express.Multer.File
    ): Promise<{ message: string, new_product: Product }> {
        return await this.#_service.createProduct(createProductPayload, image);
    }

    @ApiOperation({ summary: "Update product" })
    @ApiConsumes('multipart/form-data')
    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    async updateProduct(
        @Param('id') id: string,
        @Body() updateProductPayload: UpdateProductDto,
        @UploadedFile() file?: Express.Multer.File
    ): Promise<{ message: string, updatedProduct: Product }> {
        return await this.#_service.updateProduct(+id, updateProductPayload, file);
    }

    @ApiOperation({ summary: "Delete product" })
    @Delete('/:id')
    async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
        return await this.#_service.deleteProduct(+id);
    }
}