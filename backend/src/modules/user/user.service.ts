import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'
import * as bcrypt from 'bcrypt'
import { CreateDto, UpdateDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10)
    const user = new this.userModel({
      ...dto,
      password: hashedPassword,
    })
    return user.save()
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec()
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password').exec()
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec()
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec()
  }

  async update(id: string, dto: UpdateDto): Promise<User | null> {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10)
    }
    return this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec()
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, { status: 'deleted' }).exec()
  }
}
