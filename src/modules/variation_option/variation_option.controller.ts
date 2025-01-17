import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateVariationOptionDto} from './dto';
import {UpdateVariationOptionDto } from './dto'
import { VariationOptionService } from './variation_option.service';

@Controller('variation-options')
export class VariationOptionController {
    constructor(private readonly variationOptionService: VariationOptionService) {}

    @Post()
    async create(@Body() dto: CreateVariationOptionDto) {
        return this.variationOptionService.create(dto);
    }

    @Get()
    async findAll() {
        return this.variationOptionService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.variationOptionService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateVariationOptionDto) {
        return this.variationOptionService.update(+id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.variationOptionService.remove(+id);
    }
}
