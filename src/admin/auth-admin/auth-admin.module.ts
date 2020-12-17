import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthAdminController } from './auth-admin.controller';
import { AuthAdminService } from './auth-admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AddCitySchema } from './schemas/add-city.schemas';

@Module({
  imports: [JwtModule.register({
    secret: 'sk@1234',
    signOptions: { expiresIn: '30d' },
  }),
  MongooseModule.forFeature([{ name: 'AddCity', schema: AddCitySchema }])],
  controllers: [AuthAdminController],
  providers: [AuthAdminService]
})
export class AuthAdminModule {}
