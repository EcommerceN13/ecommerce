import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './models/color.model';

@ApiTags('Color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new color' })
  @ApiResponse({
    status: 201,
    description: 'Color successfully created',
    type: Color,
  })
  create(@Body() createColorDto: CreateColorDto): Promise<Color> {
    return this.colorService.create(createColorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all colors' })
  @ApiResponse({ status: 200, description: 'Return all colors', type: [Color] })
  findAll(): Promise<Color[]> {
    return this.colorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get color by id' })
  @ApiResponse({ status: 200, description: 'Return color by id', type: Color })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Color> {
    return this.colorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update color by id' })
  @ApiResponse({
    status: 200,
    description: 'Color successfully updated',
    type: Color,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColorDto: UpdateColorDto,
  ): Promise<Color> {
    return this.colorService.update(id, updateColorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete color by id' })
  @ApiResponse({ status: 200, description: 'Color successfully deleted' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.colorService.remove(id);
  }
}