import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./models";
import { ApiConsumes, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateProductDto, UpdateProductDto } from "./dto";
import { ProductFilterDto } from "./interfaces";
import { PaginatedResponse } from "./interfaces/paginate-product.interface";

@ApiTags('Products')
@Controller('products')
export class ProductController {
    #_service: ProductService;
    constructor(service: ProductService) { this.#_service = service; }

    @ApiOperation({ summary: 'Get all products with optional filters, pagination and sorting' })
    @ApiQuery({ name: 'category_id', required: false, type: Number })
    @ApiQuery({ name: 'brand_id', required: false, type: Number })
    @ApiQuery({ name: 'min_price', required: false, type: Number })
    @ApiQuery({ name: 'max_price', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
    @ApiQuery({
        name: 'sort',
        required: false,
        enum: ['price_asc', 'price_desc', 'rating_desc'],
        description: 'Sort by price (asc/desc) or rating'
    })
    @ApiQuery({
        name: 'variations',
        required: false,
        type: 'object',
        description: 'Variation filters as key-value pairs (variation_id: option_id)'
    })
    @Get()
    async getAllProducts(
        @Query('category_id') category_id?: number,
        @Query('brand_id') brand_id?: number,
        @Query('min_price') min_price?: number,
        @Query('max_price') max_price?: number,
        @Query('search') search?: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('sort') sort?: 'price_asc' | 'price_desc' | 'rating_desc',
        @Query('variations') variations?: string
    ): Promise<PaginatedResponse<Product>> {
        const filters: ProductFilterDto = {
            category_id: category_id ? +category_id : undefined,
            brand_id: brand_id ? +brand_id : undefined,
            min_price: min_price ? +min_price : undefined,
            max_price: max_price ? +max_price : undefined,
            search,
            page: page ? +page : 1,
            limit: limit ? +limit : 10,
            sort,
            variations: variations ? JSON.parse(variations) : undefined
        };

        return await this.#_service.getAllProducts(filters);
    }


    @ApiOperation({ summary: 'Get single product' })
    @Get('/:id')
    async getSingleProduct(@Param('id') id: string): Promise<Product> {
        return await this.#_service.getSingleProduct(+id);
    }

    @ApiOperation({ summary: 'Get all products with "aksiya" status' })
    @Get('/aksiya')
    async getAllAksiyadagiProducts(): Promise<Product[]> {
        return await this.#_service.getAllAksiyadagiProducts();
    }

    @ApiOperation({ summary: 'Get most popular products' })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of popular products to return (default: 5)',
    })
    @Get('/popular')
    async getMostPopularProducts(@Query('limit') limit?: number): Promise<Product[]> {
        const parsedLimit = limit ? +limit : 5;
        return await this.#_service.getMostPopularProducts(parsedLimit);
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