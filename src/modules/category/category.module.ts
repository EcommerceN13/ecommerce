import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models';
import { FileService } from '../file';
import { Product } from '../product';

@Module({
  imports: [SequelizeModule.forFeature([Category, Product]), Product],
  providers: [CategoryService, FileService],
  controllers: [CategoryController],
  // exports: []
})
export class CategoryModule {}
