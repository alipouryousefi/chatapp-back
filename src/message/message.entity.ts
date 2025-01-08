import { ApiProperty } from '@nestjs/swagger';
import { ChatRoom } from 'src/chat-room/chat-room.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
    description: 'The timestamp of the message',
    example: '2023-10-01T12:00:00Z',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ApiProperty({ description: 'The sender of the message', type: () => User })
  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: User;

  @ApiProperty({ description: 'The receiver of the message', type: () => User, required: false })
  @ManyToOne(() => User, (user) => user.receivedMessages)
  receiver: User;


  @ApiProperty({ description: 'The chat room the message belongs to', type: () => ChatRoom, required: false })
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
  chatRoom: ChatRoom;
}
