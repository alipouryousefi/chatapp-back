import { UserService } from './user.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('search')
  async searchUser(@Query('query') query: string) {
    return this.userService.searchUser(query);
  }
  
}
