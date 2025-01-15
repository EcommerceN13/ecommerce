import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
    
  imports: [
    UserModule,
    ConfigModule.forRoot(),
        JwtModule.register({
                secret: process.env.JWT_SECRET, // JWT_SECRET qiymatini .env dan olish
                signOptions: {
                  expiresIn: process.env.JWT_EXPIRATION_TIME || '24h',
                },
              }),
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com', // Gmail SMTP serveri
          port: 587,  // TLS uchun port
          secure: false, // TLS uchun false
          auth: {
            user: 'kamronbekbahriyev18@gmail.com',
            pass: 'whudllcxkbgnpgmu',
          },
        },
        defaults: {
          from: `"No Reply" <${process.env.MAIL_USER}>`,
        },
        
      })
      
      
      
      
      
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
