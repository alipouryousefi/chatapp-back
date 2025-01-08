import { ApiProperty } from '@nestjs/swagger';
import { Message } from 'src/message/message.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChatRoom {
  @ApiProperty({
    description: 'The unique identifier of the chat room',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the chat room',
    example: 'General Chat',
  })
  @Column()
  name: string;

  @ApiProperty({ description: 'Participants in the chat room', type: () => [User], required: false })
  @ManyToMany(() => User, (user) => user.chatRooms)
  participants: User[];

  @ApiProperty({ description: 'Messages in the chat room', type: () => [Message], required: false })
  @OneToMany(() => Message, (message) => message.chatRoom)
  messages: Message[];
}
