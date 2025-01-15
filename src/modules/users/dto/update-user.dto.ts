import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Ism faqat matn bo‘lishi kerak.' })
  first_name?: string;

  @IsOptional()
  @IsString({ message: 'Familiya faqat matn bo‘lishi kerak.' })
  last_name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email manzili noto‘g‘ri formatda kiritilgan.' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Telefon raqami faqat matn bo‘lishi kerak.' })
  phone_number?: string;

  @IsOptional()
  @IsString({ message: 'Rasm URL faqat matn bo‘lishi kerak.' })
  image?: string;

  @IsOptional()
  @IsString({ message: 'Rol faqat matn bo‘lishi kerak.' })
  role?: string;

  @IsString()
  password?: string;
}
