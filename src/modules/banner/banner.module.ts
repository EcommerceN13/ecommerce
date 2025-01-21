// src/banner/banner.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Banner } from './model';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';

@Module({
  imports: [SequelizeModule.forFeature([Banner])],
  providers: [BannerService],
  controllers: [BannerController],
})
export class BannerModule {}
