import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// สร้าง type ของ UserDocument ที่รวม User และ Document
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, select: false }) // ไม่แสดง password โดยค่าเริ่มต้น
  password: string;

  @Prop({ required: true })
  email: string;

  // สร้าง method validatePassword
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);  // เปรียบเทียบรหัสผ่าน
  }
}

export const UserSchema = SchemaFactory.createForClass(User);


