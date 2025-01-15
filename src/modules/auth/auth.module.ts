import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user'; 
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    
  imports: [
    SequelizeModule.forFeature([User]),
    
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
