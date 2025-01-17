import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models';
import { CreateCategoryRequest, UpdateCategoryRequest } from './interfaces';
import { FileService } from '../file';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryModel: typeof Category,
    private fileService: FileService,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryModel.findAll();
  }

  async createCategory(
    payload: CreateCategoryRequest,
    imageFile: Express.Multer.File,
    iconFile: Express.Multer.File,
  ): Promise<{ message: string; category: Category }> {
    const image = await this.fileService.uploadFile(imageFile);
    const icon = await this.fileService.uploadFile(iconFile);

    const category = await this.categoryModel.create({
      name: payload.name,
      image,
      icon,
    });
    return {
      message: 'Category Created Successfully',
      category: category,
    };
  }

  async getOneCategory(id: number) {
    const foundedCategory = await this.categoryModel.findOne({ where: { id } });
    return foundedCategory;
  }

  // async updateCategory(
  //   id: number,
  //   payload: UpdateCategoryRequest,
  //   imageFile?: Express.Multer.File,
  //   iconFile?: Express.Multer.File,
  // ): Promise<{ message: string; updatedCategory: Category }> {
  //   let newImage: string | undefined;
  //   let newIcon: string | undefined;
  //   if (imageFile) {
  //     newImage = await this.fileService.uploadFile(imageFile);
  //     const category = await this.categoryModel.findOne({ where: { id } });
  //     if (category?.image) {
  //       await this.fileService.deleteFile(category.image);
  //     }
  //     payload.image = newImage;
  //   }

  //   if (iconFile) {
  //     newIcon = await this.fileService.uploadFile(iconFile);
  //     const category = await this.categoryModel.findOne({ where: { id } });
  //     if (category?.icon) {
  //       await this.fileService.deleteFile(category.icon);
  //     }
  //     payload.image = newImage;
  //   }

  //   await this.categoryModel.update(payload, {
  //     where: { id },
  //   });

  //   const updatedCategory = await this.categoryModel.findOne({ where: { id } });

  //   return {
  //     message: 'User updated successfully',
  //     updatedCategory,
  //   };
  // }



  async updateCategory(
    id: number,
    payload: UpdateCategoryDto,
    imageFile?: Express.Multer.File,
    iconFile?: Express.Multer.File,
  ): Promise<{ message: string; updatedCategory: Category }> {
    const category = await this.categoryModel.findOne({ where: { id } });
  
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
  
    // Update image if provided
    if (imageFile) {
      const newImage = await this.fileService.uploadFile(imageFile);
      if (category.image) {
        await this.fileService.deleteFile(category.image);
      }
      payload.image = newImage;
    }
  
    // Update icon if provided
    if (iconFile) {
      const newIcon = await this.fileService.uploadFile(iconFile);
      if (category.icon) {
        await this.fileService.deleteFile(category.icon);
      }
      payload.icon = newIcon;
    }
  
    // Update the category
    await this.categoryModel.update(payload, { where: { id } });
  
    const updatedCategory = await this.categoryModel.findOne({ where: { id } });
  
    return {
      message: 'Category updated successfully',
      updatedCategory,
    };
  }
  



  async deleteCategory(id: number): Promise<void> {
    const foundedCategory = await this.categoryModel.findByPk(id);

    foundedCategory.destroy();
    await this.fileService.deleteFile(foundedCategory?.image);
    await this.fileService.deleteFile(foundedCategory?.icon);
  }
}
