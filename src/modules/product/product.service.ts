import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models';
import { FileService } from '../file';
import { CreateProductDto } from './dto';
import { UpdateProductRequest } from './interfaces/update-product.interface';
import { Op } from 'sequelize';
import { ProductFilterDto } from './interfaces';
import { Like } from '../like';
import { Comment } from '../comment';
import { Category } from '../category';
import { PaginatedResponse } from './interfaces/paginate-product.interface';
import { ProductItem } from '../product_item';
import { Variation } from '../variation';
import { VariationOption } from '../variation_option';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    private fileService: FileService,
  ) { }

  async getAllProducts(
    filters?: ProductFilterDto,
  ): Promise<PaginatedResponse<Product>> {
    const whereClause: any = {};
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;
    let order: any[] = [];

    if (filters) {
      if (filters.category_id) {
        whereClause.category_id = filters.category_id;
      }

      if (filters.brand_id) {
        whereClause.brand_id = filters.brand_id;
      }

      if (filters.min_price || filters.max_price) {
        whereClause.price = {};
        if (filters.min_price) {
          whereClause.price[Op.gte] = filters.min_price;
        }
        if (filters.max_price) {
          whereClause.price[Op.lte] = filters.max_price;
        }
      }

      if (filters.search) {
        whereClause[Op.or] = [
          {
            name: {
              [Op.iLike]: `%${filters.search}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${filters.search}%`,
            },
          },
        ];
      }

      // Add variation filtering
      if (filters.variations && Object.keys(filters.variations).length > 0) {
        const variationFilters = [];

        for (const [variationId, optionId] of Object.entries(filters.variations)) {
          variationFilters.push({
            '$productItems.variationOptions.variation_id$': variationId,
            '$productItems.variationOptions.id$': optionId,
          });
        }

        whereClause[Op.and] = variationFilters;
      }

      if (filters.sort) {
        switch (filters.sort) {
          case 'price_asc':
            order.push(['price', 'ASC']);
            break;
          case 'price_desc':
            order.push(['price', 'DESC']);
            break;
          case 'rating_desc':
            order.push(['rating', 'DESC']);
            break;
        }
      }
    }

    const { count, rows } = await this.productModel.findAndCountAll({
      where: whereClause,
      include: [
        { model: Comment },
        { model: Like },
        { model: Category },
        {
          model: ProductItem,
          include: [{
            model: VariationOption,
            include: [{
              model: Variation,
              attributes: ['name', 'color']
            }]
          }]
        },
      ],
      order,
      limit,
      offset,
      distinct: true,
    });

    return {
      items: rows,
      total: count,
      page: page,
      limit: limit,
      totalPages: Math.ceil(count / limit),
    };
  }


  async getSingleProduct(id: number): Promise<Product> {
    return await this.productModel.findOne({
      where: { id },
      include: [
        { model: Comment },
        { model: Like },
        { model: Category },
        { model: ProductItem },
      ],
    });
  }

  async getAllAksiyadagiProducts(): Promise<Product[]> {
    return await this.productModel.findAll({
      where: { is_aksiya: true },
      include: [Category, Like, Comment],
    });
  }

  async getMostPopularProducts(limit: number = 5): Promise<Product[]> {
    return await this.productModel.findAll({
      order: [['rating', 'DESC']],
      limit,
      include: [Category, Like, Comment],
    });
  }


  async createProduct(payload: CreateProductDto, file: Express.Multer.File): Promise<{ message: string, new_product: Product }> {
    const image = await this.fileService.uploadFile(file);

    const new_product = await this.productModel.create({
      ...payload,
      image,
    });

    return {
      message: 'Product created successfully',
      new_product,
    };
  }

  async updateProduct(
    id: number,
    payload: UpdateProductRequest,
    file?: Express.Multer.File,
  ): Promise<{ message: string; updatedProduct: Product }> {
    let newFileName: string | undefined;

    if (file) {
      newFileName = await this.fileService.uploadFile(file);
      const product = await this.productModel.findOne({ where: { id } });
      if (product?.image) {
        await this.fileService.deleteFile(product.image);
      }
      payload.image = newFileName;
    }

    await this.productModel.update(payload, {
      where: { id },
    });

    const updatedProduct = await this.productModel.findOne({
      where: { id },
      include: ['category'],
    });

    return {
      message: 'Product updated successfully',
      updatedProduct,
    };
  }

  async deleteProduct(id: number): Promise<{ message: string }> {
    const foundedProduct = await this.productModel.findByPk(id);

    if (foundedProduct.image) {
      await this.fileService.deleteFile(foundedProduct.image);
    }

    await foundedProduct.destroy();

    return {
      message: 'Product deleted successfully',
    };
  }
}
