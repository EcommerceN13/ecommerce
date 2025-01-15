import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user';
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
  ) { }

  private generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

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

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { email, fullname, password } = registerDto;

    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException("Email allaqachon ro'yxatdan o'tgan", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      fullname,
      email,
      password: hashedPassword,
      is_verified: false, 
    });

    const otp = this.generateOtp();

    global.otpStore = global.otpStore || {};
    global.otpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      userId: newUser.id 
    };

    await this.mailerService.sendMail({
      to: email,
      subject: 'Tasdiqlash kodi',
      text: `Sizning tasdiqlash kodingiz: ${otp}`,
    });

    return { message: 'Tasdiqlash kodi yuborildi' };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<AuthResponse> {
    const { email, otp } = verifyOtpDto;

    const otpData = global.otpStore?.[email];
    if (!otpData) {
      throw new HttpException('Tasdiqlash kodi topilmadi', HttpStatus.BAD_REQUEST);
    }

    if (otpData.otp !== otp) {
      throw new HttpException("Noto'g'ri tasdiqlash kodi", HttpStatus.BAD_REQUEST);
    }

    if (Date.now() > otpData.expiresAt) {
      delete global.otpStore[email];
      throw new HttpException('Tasdiqlash kodi muddati tugagan', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel.findOne({ where: { id: otpData.userId } });
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }

    await user.update({ is_verified: true });

    delete global.otpStore[email];

    const tokens = this.generateTokens(user.id, user.email);
    return {
      ...tokens,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        is_verified: user.is_verified,
      },
      message: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      throw new HttpException("Email yoki parol noto'g'ri", HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException("Email yoki parol noto'g'ri", HttpStatus.UNAUTHORIZED);
    }

    if (!user.is_verified) {
      throw new HttpException('Iltimos, emailingizni tasdiqlang', HttpStatus.FORBIDDEN);
    }

    const tokens = this.generateTokens(user.id, user.email);
    return {
      ...tokens,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        is_verified: user.is_verified,
      },
      message: 'Muvaffaqiyatli login qilindi',
    };
  }
}