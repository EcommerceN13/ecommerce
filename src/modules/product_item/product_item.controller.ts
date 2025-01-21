import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductItemService } from './product_item.service';
import { CreateProductItemDto } from './dto';
import { UpdateProductItemDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product-items')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createProductItemDto: CreateProductItemDto, @UploadedFile() file: Express.Multer.File) {
    return this.productItemService.create(createProductItemDto,file);
  }

  @Get()
  findAll() {
    return this.productItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductItemDto: UpdateProductItemDto) {
    return this.productItemService.update(+id, updateProductItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productItemService.delete(+id);
  }
}
