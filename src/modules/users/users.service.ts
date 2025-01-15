import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  // Yangi foydalanuvchini qo'shish
  async create(userData: CreateUserDto): Promise<User> {
    // Emailni tekshirish, agar mavjud bo'lsa, xatolik
    const existingUser = await this.userModel.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new HttpException('Ushbu email allaqachon ro\'yxatdan o\'tgan', HttpStatus.BAD_REQUEST);
    }

    // Yangi foydalanuvchi yaratish
    return await this.userModel.create(userData);
  }

  // Barcha foydalanuvchilarni olish
  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  // ID orqali foydalanuvchini topish
  async findOneById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // ID orqali foydalanuvchini yangilash
  async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findOneById(id);
    return await user.update(updateData);
  }

  // ID orqali foydalanuvchini o'chirish
  async delete(id: number): Promise<void> {
    const user = await this.findOneById(id);
    await user.destroy();
  }
}
