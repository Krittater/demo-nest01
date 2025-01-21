import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt'; // เพิ่มการนำเข้า JwtModule

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: 'yourSecretKey', // เปลี่ยนเป็น secret key ที่ปลอดภัยในโปรดักชัน
      signOptions: { expiresIn: '1h' }, // ตั้งเวลาหมดอายุของ token ตามที่ต้องการ
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
