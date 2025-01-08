import { ApiProperty } from '@nestjs/swagger';
import { ChatRoom } from 'src/chat-room/chat-room.entity';
import { Message } from 'src/message/message.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'The profile picture URL of the user',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @Column({ nullable: true })
  profilePicture: string;

  @ApiProperty({ description: 'Messages sent by the user', type: () => [Message], required: false })
  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @ApiProperty({ description: 'Messages received by the user', type: () => [Message], required: false })
  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

  @ApiProperty({ description: 'Chat rooms the user is part of', type: () => [ChatRoom], required: false })
  @ManyToMany(() => ChatRoom, (chatRoom) => chatRoom.participants)
  chatRooms: ChatRoom[];
}
