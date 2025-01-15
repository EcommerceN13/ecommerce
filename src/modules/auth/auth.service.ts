import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/model'; // User modeli
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { LoginDto, RegisterDto, VerifyOtpDto } from './dtos';
import { AuthResponse } from './interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  // OTP yaratish uchun yordamchi funksiya
  private generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  // Access va refresh tokenlarni yaratish
  private generateTokens(userId: number, email: string) {
    return {
      accessToken: this.jwtService.sign(
        { userId, email },
        { expiresIn: process.env.JWT_EXPIRATION_TIME || '24h', secret: process.env.JWT_SECRET },
      ),
      refreshToken: this.jwtService.sign(
        { userId, email },
        { expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME || '7d', secret: process.env.JWT_SECRET },
      ),
    };
  }

  // Register
  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { email, first_name, password } = registerDto;

    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException('Email allaqachon ro‘yxatdan o‘tgan', HttpStatus.BAD_REQUEST);
    }

    const otp = this.generateOtp();

    // OTPni vaqtinchalik saqlash
    global.otpStore = global.otpStore || {};
    global.otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };

    // Emailga OTP yuborish
    await this.mailerService.sendMail({
      to: email,
      subject: 'Tasdiqlash kodi',
      text: `Sizning tasdiqlash kodingiz: ${otp}`,
    });

    return { message: 'Tasdiqlash kodi yuborildi' };
  }

  // OTPni tekshirish va yangi foydalanuvchi yaratish
  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<AuthResponse> {
    const { email, otp, password, first_name } = verifyOtpDto;

    const otpData = global.otpStore?.[email];
    if (!otpData) {
      throw new HttpException('Tasdiqlash kodi topilmadi', HttpStatus.BAD_REQUEST);
    }

    if (otpData.otp !== otp) {
      throw new HttpException('Noto‘g‘ri tasdiqlash kodi', HttpStatus.BAD_REQUEST);
    }

    if (Date.now() > otpData.expiresAt) {
      delete global.otpStore[email];
      throw new HttpException('Tasdiqlash kodi muddati tugagan', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      role: 'user',
      first_name,
      last_name: first_name, // Yoki kerak bo'lsa boshqa qiymat bering
    });

    delete global.otpStore[email];

    const tokens = this.generateTokens(user.id, user.email);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      message: 'Muvaffaqiyatli ro‘yxatdan o‘tdingiz',
    };
  }

  // Login
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Email yoki parol noto‘g‘ri', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Email yoki parol noto‘g‘ri', HttpStatus.UNAUTHORIZED);
    }

    const tokens = this.generateTokens(user.id, user.email);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      message: 'Muvaffaqiyatli login qilindi',
    };
  }
}
