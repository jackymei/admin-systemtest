import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { OperLog, OperLogDocument } from './schemas/oper-log.schema'

@Injectable()
export class OperLogService {
  constructor(
    @InjectModel(OperLog.name) private operLogModel: Model<OperLogDocument>,
  ) {}

  async create(logData: any): Promise<OperLog> {
    const log = new this.operLogModel(logData)
    return log.save()
  }

  async findAll(query: any = {}) {
    const { page = 1, pageSize = 10, userId, module, startTime, endTime } = query

    const filter: any = {}
    if (userId) filter.userId = userId
    if (module) filter.module = new RegExp(module, 'i')
    if (startTime || endTime) {
      filter.createdAt = {}
      if (startTime) filter.createdAt.$gte = new Date(startTime)
      if (endTime) filter.createdAt.$lte = new Date(endTime)
    }

    const total = await this.operLogModel.countDocuments(filter).exec()
    const items = await this.operLogModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize))
      .exec()

    return { total, items, page: parseInt(page), pageSize: parseInt(pageSize) }
  }

  async cleanup(days: number = 30): Promise<number> {
    const date = new Date()
    date.setDate(date.getDate() - days)
    const result = await this.operLogModel.deleteMany({
      createdAt: { $lt: date },
    }).exec()
    return result.deletedCount
  }
}
