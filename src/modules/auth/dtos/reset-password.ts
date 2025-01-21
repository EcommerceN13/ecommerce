import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Email manzili noto‘g‘ri' })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  email: string;

  @IsString({ message: 'Tasdiqlash kodi satr bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Tasdiqlash kodi kiritilishi shart' })
  otp: string;

  @IsString({ message: 'Yangi parol satr bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Yangi parol kiritilishi shart' })
  @Length(8, 32, { message: 'Parol uzunligi 8 dan 32 gacha bo‘lishi kerak' })
  new_password: string;
}