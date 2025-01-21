import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Case, CaseDocument } from './schemas/case.schema';

@Injectable()
export class CasesService {
  constructor(
    @InjectModel(Case.name) private readonly caseModel: Model<CaseDocument>, // Inject โมเดล `Case`
  ) {}

  // สร้าง Case ใหม่
  async create(createCaseDto: CreateCaseDto): Promise<Case> {
    const newCase = new this.caseModel(createCaseDto);
    return newCase.save();
  }

  // ดึงข้อมูล Case ทั้งหมด
  async findAll(): Promise<Case[]> {
    return this.caseModel.find().exec();
  }

  // ดึงข้อมูล Case ตาม ID
  async findOne(id: string): Promise<Case> {
    const caseData = await this.caseModel.findById(id).exec();
    if (!caseData) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    return caseData;
  }

  // อัปเดตข้อมูล Case ตาม ID
  async update(id: string, updateCaseDto: UpdateCaseDto): Promise<Case> {
    const updatedCase = await this.caseModel
      .findByIdAndUpdate(id, updateCaseDto, { new: true, runValidators: true })
      .exec();
    if (!updatedCase) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    return updatedCase;
  }

  // ลบ Case ตาม ID
  async remove(id: string): Promise<void> {
    const result = await this.caseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
  }
}
