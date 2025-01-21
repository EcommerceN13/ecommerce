import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductItem } from './models';
import { CreateProductItemDto } from './dto';
import { UpdateProductItemDto } from './dto';
import { Attributes } from 'sequelize';
import { FileService } from '../file';

@Injectable()
export class ProductItemService {
  constructor(@InjectModel(ProductItem) private readonly productItemModel: typeof ProductItem,private fileService: FileService,) {}

  async create(createProductItemDto: CreateProductItemDto, file: Express.Multer.File): Promise<ProductItem> {
    console.log(file, createProductItemDto)
    const image = await this.fileService.uploadFile(file);


    return this.productItemModel.create({
      price: createProductItemDto.price,
      image,
      product_id: createProductItemDto.product_id,
    });
  }

  async findAll(): Promise<ProductItem[]> {
    return this.productItemModel.findAll({ include: [{ all: true }] });
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
