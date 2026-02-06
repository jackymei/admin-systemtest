import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Message, MessageDocument } from './schemas/message.schema'

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(messageData: any): Promise<Message> {
    const message = new this.messageModel(messageData)
    return message.save()
  }

  async createBulk(messages: any[]): Promise<Message[]> {
    return this.messageModel.insertMany(messages)
  }

  async findAll(query: any = {}) {
    const { page = 1, pageSize = 10, userId, type, read } = query

    const filter: any = {}
    if (userId) filter.userId = userId
    if (type) filter.type = type
    if (read !== undefined) filter.read = read

    const total = await this.messageModel.countDocuments(filter).exec()
    const items = await this.messageModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize))
      .exec()

    const unread = await this.messageModel.countDocuments({ userId, read: false }).exec()

    return { total, items, page: parseInt(page), pageSize: parseInt(pageSize), unread }
  }

  async findById(id: string): Promise<Message | null> {
    return this.messageModel.findById(id).exec()
  }

  async markAsRead(id: string): Promise<Message | null> {
    return this.messageModel.findByIdAndUpdate(id, { read: true }, { new: true }).exec()
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await this.messageModel.updateMany({ userId, read: false }, { read: true }).exec()
    return result.modifiedCount
  }

  async remove(id: string): Promise<Message | null> {
    return this.messageModel.findByIdAndDelete(id).exec()
  }

  async removeBatch(ids: string[]): Promise<number> {
    const result = await this.messageModel.deleteMany({ _id: { $in: ids } }).exec()
    return result.deletedCount
  }
}
