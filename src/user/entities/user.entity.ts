import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Message } from 'src/message/entities/message.entity';
import { ConversationParticipant } from 'src/conversation/entities/conversation-participant.entity';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe'
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john@example.com'
  })
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @ApiProperty({
    description: 'URL to the user\'s avatar image',
    example: 'https://example.com/avatars/john.jpg',
    required: false
  })
  @Column({ nullable: true })
  avatarUrl: string;

  @ApiProperty({
    description: 'Indicates if the user is currently online',
    example: true
  })
  @Column({ default: false })
  isOnline: boolean;

  @ApiProperty({
    description: 'Timestamp of user\'s last activity',
    example: '2024-01-12T12:00:00Z'
  })
  @Column({ nullable: true })
  lastSeen: Date;

  @ApiProperty({
    description: 'Array of messages sent by the user',
    type: () => [Message]
  })
  @OneToMany(() => Message, message => message.sender)
  messages: Message[];

  @ApiProperty({
    description: 'Array of conversations the user participates in',
    type: () => [ConversationParticipant]
  })
  @OneToMany(() => ConversationParticipant, participant => participant.user)
  conversations: ConversationParticipant[];

  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2024-01-12T12:00:00Z'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: '2024-01-12T12:00:00Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
