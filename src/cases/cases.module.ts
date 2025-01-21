import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // สำหรับการเชื่อมต่อ MongoDB
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Case, CaseSchema } from './schemas/case.schema'; // นำเข้า Schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Case.name, schema: CaseSchema }]), // ลงทะเบียน Schema
  ],
  controllers: [CasesController],
  providers: [CasesService],
  exports: [CasesService], // เผื่อกรณีที่ต้องใช้ใน Module อื่น
})
export class CasesModule {}
