import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'secret123123',
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '24h',
      },
    }),
  ],
})
export class AuthModule {}
