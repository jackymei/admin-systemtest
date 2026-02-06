import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

export type MessageDocument = Message & Document

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  type: string

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  content: string

  @Prop({ default: false })
  read: boolean

  @Prop({ required: true })
  source: string

  @Prop()
  link: string
}

export const MessageSchema = SchemaFactory.createForClass(Message)
