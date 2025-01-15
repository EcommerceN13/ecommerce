import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

JwtModule.register({
  secret: process.env.JWT_SECRET, // secret bu yerda o'zgaradi
  signOptions: {
    expiresIn: process.env.JWT_EXPIRATION_TIME || '24h',
  },
});
