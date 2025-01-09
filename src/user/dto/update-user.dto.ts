import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The profile picture URL of the user',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  profilePicture?: string;
}
