import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateProductConfigurationDto } from './dto';
import {UpdateProductConfigurationDto} from './dto'
import { ProductConfigurationService } from './product_configuration.service';

@Controller('product-configurations')
export class ProductConfigurationController {
    constructor(private readonly productConfigurationService: ProductConfigurationService) {}

    @Post()
    async create(@Body() dto: CreateProductConfigurationDto) {
        return this.productConfigurationService.create(dto);
    }

    @Get()
    async findAll() {
        return this.productConfigurationService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.productConfigurationService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateProductConfigurationDto) {
        return this.productConfigurationService.update(+id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.productConfigurationService.remove(+id);
    }
}
