import { ApiProperty } from '@nestjs/swagger';
import { Message } from 'src/message/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConversationParticipant } from './conversation-participant.entity';

@Entity()
export class Conversation {
  @ApiProperty({
    description: 'The unique identifier of the conversation',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the conversation (required for group chats)',
    example: 'Project Team Chat',
    required: false,
  })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({
    description: 'Indicates if this is a group conversation',
    example: true,
  })
  @Column({ default: false })
  isGroup: boolean;

  @ApiProperty({
    description: 'Array of messages in the conversation',
    type: () => [Message],
  })
  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @ApiProperty({
    description: 'Array of participants in the conversation',
    type: () => [ConversationParticipant],
  })
  @OneToMany(
    () => ConversationParticipant,
    (participant) => participant.conversation,
  )
  participants: ConversationParticipant[];

  @ApiProperty({
    description: 'Timestamp when the conversation was created',
    example: '2024-01-12T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the conversation was last updated',
    example: '2024-01-12T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
