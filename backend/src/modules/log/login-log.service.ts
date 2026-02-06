import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { LoginLog, LoginLogDocument } from './schemas/login-log.schema'

@Injectable()
export class LoginLogService {
  constructor(
    @InjectModel(LoginLog.name) private loginLogModel: Model<LoginLogDocument>,
  ) {}

  async create(logData: any): Promise<LoginLog> {
    const log = new this.loginLogModel(logData)
    return log.save()
  }

  async findAll(query: any = {}) {
    const { page = 1, pageSize = 10, userId, ip, status } = query

    const filter: any = {}
    if (userId) filter.userId = userId
    if (ip) filter.ip = new RegExp(ip, 'i')
    if (status) filter.status = status

    const total = await this.loginLogModel.countDocuments(filter).exec()
    const items = await this.loginLogModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize))
      .exec()

    return { total, items, page: parseInt(page), pageSize: parseInt(pageSize) }
  }

  async cleanup(days: number = 90): Promise<number> {
    const date = new Date()
    date.setDate(date.getDate() - days)
    const result = await this.loginLogModel.deleteMany({
      createdAt: { $lt: date },
    }).exec()
    return result.deletedCount
  }
}
