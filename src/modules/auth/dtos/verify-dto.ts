// src/modules/auth/dtos/verify-otp.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  otp: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  first_name: string;
}
