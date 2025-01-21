import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config'; // เพิ่มการนำเข้า ConfigService

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService, // Inject ConfigService
  ) {}

  // ฟังก์ชันสร้างผู้ใช้ใหม่
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ username: createUserDto.username }).exec();
    if (existingUser) {
      throw new Error('Username is already taken');
    }
  
    // เข้ารหัสรหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const result = new this.userModel({
      ...createUserDto,
      password: hashedPassword,  // ตั้งรหัสผ่านที่เข้ารหัสแล้ว
    });
  
    return result.save();
  }

  // ฟังก์ชันค้นหาผู้ใช้ทั้งหมด
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // ฟังก์ชันค้นหาผู้ใช้ตาม ID
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  // ฟังก์ชันอัปเดตข้อมูลผู้ใช้
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return updatedUser;
  }

  // ฟังก์ชันลบข้อมูลผู้ใช้
  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return { deleted: true, message: `User with ID "${id}" has been removed` };
  }

  // ฟังก์ชัน Login ที่ใช้ JWT
  async login(username: string, password: string): Promise<{ accessToken: string }> {
    // ค้นหาผู้ใช้โดยใช้ username และดึงข้อมูล password จากฐานข้อมูล
    const user = await this.userModel.findOne({ username }).select('+password').exec();
  
    if (!user) {
      this.logger.warn(`Invalid login attempt for username: ${username}`);
      throw new UnauthorizedException('Invalid username or password');
    }
  
    // ตรวจสอบรหัสผ่านโดยใช้ bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      this.logger.warn(`Invalid login attempt for username: ${username}`);
      throw new UnauthorizedException('Invalid username or password');
    }
  
    // สร้าง payload สำหรับ JWT
    const payload = { username: user.username, sub: user._id };  // sub คือ user._id
  
    // ดึงค่า JWT_SECRET และ JWT_EXPIRES_IN จาก .env
    const secretKey = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');
    
    // สร้าง token โดยใช้ JwtService
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn: `${expiresIn}s`, // ส่งเวลาเป็น seconds
    });
  
    return { accessToken };
  }

  async logout(userId: string): Promise<{ message: string }> {
    try {
      return { message: 'User logged out successfully' };
    } catch (error) {
      throw new UnauthorizedException('Unable to logout');
    }
  }

  
}