// src/banner/banner.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Banner } from './model';
import { CreateBannerDto, UpdateBannerDto } from './dto';
import { Product } from '../product';
import { Category } from '../category';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner)
    private readonly bannerModel: typeof Banner,
  ) {}

  // Create a new banner
  async create(createBannerDto: CreateBannerDto): Promise<Banner> {
    const banner = await this.bannerModel.create({
      ...createBannerDto,
    });
    return banner;
  }

  // Get all banners
  async findAll(): Promise<Banner[]> {
    return this.bannerModel.findAll({
      include: [
                { model: Product},
                { model: Category},
              ]
    });
  }

  // Get a banner by id
  async findOne(id: number): Promise<Banner> {
    return this.bannerModel.findByPk(id,{
      include: [
        { model: Product},
        { model: Category},
      ]
    });
  }

  // Update a banner by id
  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<Banner> {
    const banner = await this.findOne(id);
    if (!banner) {
      throw new Error('Banner not found');
    }
    await banner.update(updateBannerDto);
    return banner;
  }

  // Delete a banner by id
  async remove(id: number): Promise<void> {
    const banner = await this.findOne(id);
    if (!banner) {
      throw new Error('Banner not found');
    }
    await banner.destroy();
  }
}
