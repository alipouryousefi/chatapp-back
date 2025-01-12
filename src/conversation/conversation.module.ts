import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { ConversationParticipant } from './entities/conversation-participant.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Conversation,ConversationParticipant]),
    ],
  providers: [ConversationService],
  controllers: [ConversationController]
})
export class ConversationModule {}
