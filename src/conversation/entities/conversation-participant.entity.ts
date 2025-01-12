import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Conversation } from './conversation.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class ConversationParticipant {
  @ApiProperty({
    description: 'The unique identifier of the conversation participant',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The user participating in the conversation',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.conversations)
  user: User;

  @ApiProperty({
    description: 'The conversation the user is participating in',
    type: () => Conversation,
  })
  @ManyToOne(() => Conversation, (conversation) => conversation.participants)
  conversation: Conversation;

  @ApiProperty({
    description: 'Indicates if the user is an admin in the conversation',
    example: true,
  })
  @Column({ default: false })
  isAdmin: boolean;

  @ApiProperty({
    description: 'Indicates if the conversation is muted for this user',
    example: false,
  })
  @Column({ default: true })
  isMuted: boolean;

  @ApiProperty({
    description: 'Timestamp when the participant was added to the conversation',
    example: '2024-01-12T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the participant's settings were last updated",
    example: '2024-01-12T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
