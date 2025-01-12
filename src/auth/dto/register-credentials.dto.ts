import { ApiProperty } from '@nestjs/swagger';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterCredentialsDto extends AuthCredentialsDto {
  @ApiProperty({ example: 'johndoe' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}
