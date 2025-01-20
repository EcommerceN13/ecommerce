import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./models";
import { FileService } from "../file";
import { CreateProductDto } from "./dto"; 
import { UpdateProductRequest } from "./interfaces/update-product.interface";
import { Like } from "../like";
import { Comment } from "../comment";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    private fileService: FileService
  ) { }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.findAll({ include: [
              { model: Comment},
              { model: Like },
            ]
    });
  }

  async getSingleProduct(id: number): Promise<Product> {
    return await this.productModel.findOne({
      where: { id },
      include: ['category']
    });
  }

  async createProduct(payload: CreateProductDto, file: Express.Multer.File): Promise<{ message: string, new_product: Product }> {
    const image = await this.fileService.uploadFile(file);

    const new_product = await this.productModel.create({
      ...payload,
      image
    });

    return {
      message: 'Product created successfully',
      new_product
    };
  }

  async updateProduct(id: number, payload: UpdateProductRequest, file?: Express.Multer.File): Promise<{ message: string, updatedProduct: Product }> {
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
      where: { id }
    });

    const updatedProduct = await this.productModel.findOne({
      where: { id },
      include: ['category']
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
      message: 'Product deleted successfully'
    };
  }
}