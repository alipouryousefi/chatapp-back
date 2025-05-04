import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Message } from '../messages/entities/message.entity';

@ObjectType()
@Schema()
export class Chat extends AbstractEntity {
  @Field()
  name: string;

  @Field(() => Message, { nullable: true })
  latestMessage?: Message;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
