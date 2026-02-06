import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SystemConfig, SystemConfigDocument } from './schemas/system-config.schema'

@Injectable()
export class ConfigService {
  constructor(
    @InjectModel(SystemConfig.name) private configModel: Model<SystemConfigDocument>,
  ) {}

  async findAll() {
    const configs = await this.configModel.find().exec()
    const result: Record<string, any> = {}
    configs.forEach((config) => {
      result[config.key] = config.value
    })
    return result
  }

  async findByKey(key: string): Promise<SystemConfig | null> {
    return this.configModel.findOne({ key }).exec()
  }

  async findByPrefix(prefix: string) {
    const configs = await this.configModel.find({ key: { $regex: `^${prefix}` } }).exec()
    const result: Record<string, any> = {}
    configs.forEach((config) => {
      result[config.key] = config.value
    })
    return result
  }

  async update(key: string, value: any): Promise<SystemConfig | null> {
    return this.configModel.findOneAndUpdate({ key }, { value }, { upsert: true, new: true }).exec()
  }

  async updateBatch(configs: Record<string, any>): Promise<SystemConfig[]> {
    const updates = Object.entries(configs).map(([key, value]) =>
      this.configModel.findOneAndUpdate({ key }, { value }, { upsert: true, new: true }).exec(),
    )
    return Promise.all(updates)
  }

  async delete(key: string): Promise<SystemConfig | null> {
    return this.configModel.findOneAndDelete({ key }).exec()
  }

  async deleteByPrefix(prefix: string) {
    return this.configModel.deleteMany({ key: { $regex: `^${prefix}` } }).exec()
  }
}
