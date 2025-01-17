import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Category } from './models';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@ApiTags('Category')
@Controller('/categories')
export class CategoryController {
  #_service: CategoryService;

  constructor(categoryService: CategoryService) {
    this.#_service = categoryService;
  }

  @Protected(false)
  @Roles([UserRoles.user, UserRoles.admin])
  @ApiOperation({
    description: 'Barcha CategoryLarni olish',
    summary: 'Barcha Categoryni Olish',
  })
  @Get('/all')
  async getAllCategories(): Promise<Category[]> {
    return this.#_service.getAllCategories();
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Category create qilish' })
  @Protected(true)
  @Roles([UserRoles.admin])
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'icon', maxCount: 1 },
    ]),
  )
  @Post('/add')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles()
    files: { image: Express.Multer.File; icon: Express.Multer.File },
  ): Promise<{ message: string; category: Category }> {
    return this.#_service.createCategory(
      createCategoryDto,
      files.image[0],
      files.icon[0],
    );
  }

  @Protected(false)
  @Roles([UserRoles.user, UserRoles.admin])
  @ApiOperation({
    summary: 'Bitta Categoryni Olish',
  })
  @Get('/:categoryId')
  async getOneCategory(@Param('categoryId') id: number) {
    return this.#_service.getOneCategory(+id);
  }

  // @ApiBearerAuth()
  // @ApiConsumes('multipart/form-data')
  // @ApiOperation({ summary: 'Categoryni Update qilish' })
  // @Protected(true)
  // @Roles([UserRoles.admin])
  // @Patch('/update/:categoryId')

  // @UseInterceptors(FileFieldsInterceptor([
  //   { name: 'image', maxCount: 1 },
  //   { name: 'icon', maxCount: 1 },
  // ]))
  // uploadFile(@UploadedFiles() files: { image?: Express.Multer.File, icon?: Express.Multer.File }) {
  //   console.log(files);
  // }

  // async updateCategory(
  //   @Body() updateCategoryPayload: UpdateCategoryDto,
  //   @Param('categoryId', ParseIntPipe) categoryId: number,
  // ): Promise<void> 

  // }


  @ApiBearerAuth()
@ApiConsumes('multipart/form-data')
@ApiOperation({ summary: 'Categoryni Update qilish' })
@Protected(true)
@Roles([UserRoles.admin])
@Patch('/update/:categoryId')
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
  ]),
)
async updateCategory(
  @UploadedFiles() files: { image?: Express.Multer.File[]; icon?: Express.Multer.File[] },
  @Body() updateCategoryPayload: UpdateCategoryDto,
  @Param('categoryId', ParseIntPipe) categoryId: number,
): Promise<{ message: string; updatedCategory: Category }> {
  const imageFile = files?.image?.[0];
  const iconFile = files?.icon?.[0];

  return this.#_service.updateCategory(categoryId, updateCategoryPayload, imageFile, iconFile);
}


  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({
    summary: 'Categoryni Ochirib tashlash',
  })
  @Delete('/delete/:categoryId')
  async deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.#_service.deleteCategory(categoryId);
  }
}
