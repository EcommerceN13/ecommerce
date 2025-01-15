import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Ism majburiy maydon.' })
  @IsString({ message: 'Ism faqat matn bo‘lishi kerak.' })
  first_name: string;

  @IsNotEmpty({ message: 'Email majburiy maydon.' })
  @IsEmail({}, { message: 'Email manzili noto‘g‘ri formatda kiritilgan.' })
  email: string;

  @IsNotEmpty({ message: 'Parol majburiy maydon.' })
  @IsString({ message: 'Parol faqat matn bo‘lishi kerak.' })
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak.' })
  password: string;

  @IsOptional()
  image?: any;
}
