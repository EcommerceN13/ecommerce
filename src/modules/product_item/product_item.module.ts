import { Module } from '@nestjs/common';
import { ProductItemService } from './product_item.service';
import { ProductItemController } from './product_item.controller';

@Module({
  controllers: [ProductItemController],
  providers: [ProductItemService],
})
export class ProductItemModule {}
