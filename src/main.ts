import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ใช้ Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  // ตั้งค่า Session
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my-secret', // ใช้ secret จาก env
      resave: false,
      saveUninitialized: false,
    }),
  );

  // เริ่มฟังที่พอร์ตที่ตั้งไว้
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
