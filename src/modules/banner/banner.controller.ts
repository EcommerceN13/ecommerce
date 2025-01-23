import { Controller, Post, Get, Param, Body, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto, UpdateBannerDto } from './dto';
import { Banner } from './model';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Protected(true)
  @Roles([UserRoles.admin])
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes("multipart/form-data")
  async create(@Body() createBannerDto: CreateBannerDto,@UploadedFile() image: Express.Multer.File): Promise<Banner> {
    return this.bannerService.create(createBannerDto, image);
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  async findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  // Get a banner by id
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Banner> {
    return this.bannerService.findOne(id);
  }

  // Update a banner by id
  @Protected(true)
  @Roles([UserRoles.admin])
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<Banner> {
    return this.bannerService.update(id, updateBannerDto);
  }

  // Delete a banner by id
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.bannerService.remove(id);
  }
}
