import { IsString, IsEnum, IsOptional, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CaseType, CaseStatus } from '../schemas/case.schema';

export class CreateCaseDto {
  @IsString()
  caseName: string;

  @IsEnum(CaseType, { message: 'caseType ต้องเป็นค่าที่กำหนดไว้ เช่น ไฟฟ้า, ประปา หรือ ช่างไม้' })
  caseType: CaseType;

  @IsString()
  personName: string;

  @IsOptional()
  @IsString()
  caseDescription?: string;

  @IsString()
  caseLocation: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  casePicture?: string[];

  @IsOptional()
  @IsDate()
  @Type(() => Date) // ใช้สำหรับแปลงค่าเป็น Date
  caseDate?: Date;

  @IsOptional()
  @IsEnum(CaseStatus, { message: 'caseStatus ต้องเป็นค่าที่กำหนดไว้ เช่น รอดำเนินการ, กำลังดำเนินการ, เสร็จสิ้น หรือ ยกเลิก' })
  caseStatus?: CaseStatus;
}
