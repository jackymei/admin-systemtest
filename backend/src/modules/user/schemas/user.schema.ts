import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop()
  phone: string

  @Prop({ required: true })
  password: string

  @Prop()
  avatar: string

  @Prop({ default: 'active' })
  status: string

  @Prop({ type: [String], default: [] })
  roles: string[]

  @Prop()
  lastLoginAt: Date

  @Prop()
  lastLoginIp: string

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}

export const UserSchema = SchemaFactory.createForClass(User)
