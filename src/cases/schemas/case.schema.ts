import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CaseDocument = Case & Document;

export enum CaseType {
  ELECTRICAL = 'ไฟฟ้า',
  PLUMBING = 'ประปา',
  CARPENTRY = 'ช่างไม้',
}

export enum CaseStatus {
    PENDING = 'รอดำเนินการ',
    IN_PROGRESS = 'กำลังดำเนินการ',
    COMPLETED = 'เสร็จสิ้น',
    CANCELLED = 'ยกเลิก',
  }

@Schema()
export class Case {
  @Prop({ type: String, required: true })
  caseName: string;

  @Prop({ type: String, enum: CaseType, required: true })
  caseType: CaseType;

  @Prop({ type: String, required: true })
  personName: string;

  @Prop({ type: String, default: '' })
  caseDescription: string;

  @Prop({ type: String, default: '' })
  caseLocation: string;

  @Prop({ type: [String], default: [] })
  casePicture: string[];

  @Prop({ type: Date, default: Date.now })
  caseDate: Date;

  @Prop({ type: String, enum: CaseStatus, default: CaseStatus.PENDING })
  caseStatus: CaseStatus;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
CaseSchema.index({ caseName: 1 });
CaseSchema.index({ caseType: 1 });
CaseSchema.index({ caseStatus: 1 });