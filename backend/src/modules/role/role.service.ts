import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Role, RoleDocument } from './schemas/role.schema'

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}

  async create(roleData: any): Promise<Role> {
    const role = new this.roleModel(roleData)
    return role.save()
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec()
  }

  async findById(id: string): Promise<Role | null> {
    return this.roleModel.findById(id).exec()
  }

  async findByCode(code: string): Promise<Role | null> {
    return this.roleModel.findOne({ code }).exec()
  }

  async update(id: string, roleData: any): Promise<Role | null> {
    return this.roleModel.findByIdAndUpdate(id, roleData, { new: true }).exec()
  }

  async remove(id: string): Promise<Role | null> {
    return this.roleModel.findByIdAndDelete(id).exec()
  }
}
