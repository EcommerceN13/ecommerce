// src/banner/banner.controller.ts
import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto, UpdateBannerDto } from './dto';
import { Banner } from './model';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}


  @Post()
  async create(@Body() createBannerDto: CreateBannerDto): Promise<Banner> {
    return this.bannerService.create(createBannerDto);
  }

  // Get all banners
  @Get()
  async findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  // Get a banner by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Banner> {
    return this.bannerService.findOne(id);
  }

  // Update a banner by id
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<Banner> {
    return this.bannerService.update(id, updateBannerDto);
  }

  // Delete a banner by id
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.bannerService.remove(id);
  }
}
