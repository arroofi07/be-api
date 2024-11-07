import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateRegisterDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // register
  @Post('/register')
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.usersService.createRegister(createRegisterDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
