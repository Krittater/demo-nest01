import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // ระบุสถานะ HTTP 201
  async create(@Body() createCaseDto: CreateCaseDto) {
    return this.casesService.create(createCaseDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK) // ระบุสถานะ HTTP 200
  async findAll() {
    return this.casesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) // ระบุสถานะ HTTP 200
  async findOne(@Param('id') id: string) {
    return this.casesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK) // ระบุสถานะ HTTP 200
  async update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto) {
    return this.casesService.update(id, updateCaseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // ระบุสถานะ HTTP 204
  async remove(@Param('id') id: string) {
    await this.casesService.remove(id);
  }
}