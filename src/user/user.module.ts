import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [JwtModule.register({
    secret: 'sku@1234',
    signOptions: { expiresIn: '30d' },
  })],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
