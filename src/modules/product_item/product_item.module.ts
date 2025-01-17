import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductItem } from './models';
import { ProductItemService } from './product_item.service';
import { ProductItemController } from './product_item.controller';

@Module({
  imports: [SequelizeModule.forFeature([ProductItem])],
  controllers: [ProductItemController],
  providers: [ProductItemService],
  exports: [ProductItemService],
})
export class ProductItemModule {}
