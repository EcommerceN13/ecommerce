import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model';
import { ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Yangi foydalanuvchini qo'shish
  @Post()
  async create(@Body(new ValidationPipe()) userData: CreateUserDto): Promise<User> {
    return this.userService.create(userData);
  }

  // Barcha foydalanuvchilarni olish
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // ID orqali foydalanuvchini olish
  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  // ID orqali foydalanuvchini yangilash
  @Put(':id')
  async update(@Param('id') id: number, @Body(new ValidationPipe()) updateData: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateData);
  }

  // ID orqali foydalanuvchini o'chirish
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.userService.delete(id);
    return { message: 'Foydalanuvchi o\'chirildi' };
  }
}
