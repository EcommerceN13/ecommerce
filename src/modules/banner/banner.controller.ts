import { Controller, Post, Get, Param, Body, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto, UpdateBannerDto } from './dto';
import { Banner } from './model';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}


  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createBannerDto: CreateBannerDto,@UploadedFile() image: Express.Multer.File): Promise<Banner> {
    return this.bannerService.create(createBannerDto, image);
  }

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
