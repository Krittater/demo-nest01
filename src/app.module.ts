import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CasesModule } from './cases/cases.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // เพิ่มการนำเข้า ConfigModule และ ConfigService
import { JwtModule } from '@nestjs/jwt'; // เพิ่มการนำเข้า JwtModule

@Module({
  imports: [
    // การตั้งค่าด้วย ConfigModule เพื่อโหลดค่าจาก .env
    ConfigModule.forRoot({
      isGlobal: true,  // ให้ค่าคอนฟิกใช้งานได้ทั่วทั้งแอป
    }),
    // เชื่อมต่อ MongoDB โดยใช้ ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'), // ดึงค่าจาก .env
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    // ตั้งค่า JwtModule โดยใช้ ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // ใช้ JWT_SECRET จาก .env
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }, // ตั้งเวลา expired จาก .env
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    ProductsModule,
    UsersModule,
    CasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
