import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductItem } from './models';
import { CreateProductItemDto } from './dto';
import { UpdateProductItemDto } from './dto';
import { Attributes } from 'sequelize';
import { Product } from '../product/models';

@Injectable()
export class ProductItemService {
  constructor(@InjectModel(ProductItem) private readonly productItemModel: typeof ProductItem) {}

  async create(createProductItemDto: CreateProductItemDto): Promise<ProductItem> {
    return this.productItemModel.create(createProductItemDto as Attributes<ProductItem>);
  }

  async findAll(): Promise<ProductItem[]> {
    return this.productItemModel.findAll({ include: [{ model:Product }] });
  }

  async findOne(id: number): Promise<ProductItem> {
    const productItem = await this.productItemModel.findByPk(id, { include: [{ all: true }] });
    if (!productItem) {
      throw new NotFoundException(`ProductItem with ID ${id} not found.`);
    }
    return productItem;
  }

  async update(id: number, updateProductItemDto: UpdateProductItemDto): Promise<ProductItem> {
    const productItem = await this.findOne(id);
    return productItem.update(updateProductItemDto as Attributes<ProductItem>);
  }

  async delete(id: number): Promise<void> {
    const productItem = await this.findOne(id);
    await productItem.destroy();
  }
}
