import { IsString, IsOptional, IsEnum, IsArray, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { CaseType, CaseStatus } from '../schemas/case.schema';

export class UpdateCaseDto {
  @IsString()
  @IsOptional()
  caseName?: string;

  @IsEnum(CaseType, { message: 'caseType ต้องเป็นค่าที่กำหนดไว้ เช่น ไฟฟ้า, ประปา หรือ ช่างไม้' })
  @IsOptional()
  caseType?: CaseType;

  @IsString()
  @IsOptional()
  personName?: string;

  @IsString()
  @IsOptional()
  caseDescription?: string;

  @IsString()
  @IsOptional()
  caseLocation?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  casePicture?: string[];

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  caseDate?: Date;

  @IsEnum(CaseStatus, { message: 'caseStatus ต้องเป็นค่าที่กำหนดไว้ เช่น รอดำเนินการ, กำลังดำเนินการ, เสร็จสิ้น หรือ ยกเลิก' })
  @IsOptional()
  caseStatus?: CaseStatus;
}
