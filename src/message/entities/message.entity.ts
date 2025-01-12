import { ApiProperty } from '@nestjs/swagger';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @ApiProperty({
    description: 'The unique identifier of the message',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello, how are you?',
  })
  @Column()
  content: string;

  @ApiProperty({
    description: 'Indicates if the message has been read',
    example: true,
  })
  @Column({ default: false })
  isRead: boolean;

  @ApiProperty({
    description: 'Timestamp when the message was read',
    example: '2024-01-12T12:00:00Z',
    required: false,
  })
  @Column({ nullable: true })
  readAt: Date;

  @ApiProperty({
    description: 'The user who sent the message',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.messages)
  sender: User;

  @ApiProperty({
    description: 'The conversation this message belongs to',
    type: () => Conversation,
  })
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @ApiProperty({
    description: 'Timestamp when the message was created',
    example: '2024-01-12T12:00:00Z'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the message was last updated',
    example: '2024-01-12T12:00:00Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
