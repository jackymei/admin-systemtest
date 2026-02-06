import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

export type LoginLogDocument = LoginLog & Document

@Schema({ timestamps: true })
export class LoginLog {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  ip: string

  @Prop()
  location: string

  @Prop()
  device: string

  @Prop()
  browser: string

  @Prop()
  os: string

  @Prop({ default: 'success' })
  status: string

  @Prop()
  reason: string
}

export const LoginLogSchema = SchemaFactory.createForClass(LoginLog)
