import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariationService } from './variation.service';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';

@Controller('variations')
export class VariationController {
  constructor(private readonly variationService: VariationService) {}

  @Post()
  create(@Body() createVariationDto: CreateVariationDto) {
    return this.variationService.create(createVariationDto);
  }

  @Get()
  findAll() {
    return this.variationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.variationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVariationDto: UpdateVariationDto) {
    return this.variationService.update(+id, updateVariationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.variationService.delete(+id);
  }
}
