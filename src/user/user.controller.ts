import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, ResponseCreateUserDto } from './dto/create-user.dto';
import { GetUserDto, ResponseGetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get All User',
  })
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get users by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get One User',
    type: ResponseGetUserDto,
  })
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('all/query')
  @ApiOperation({ summary: 'Get all users with query string' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get All User With Query String Option',
  })
  @UsePipes(ValidationPipe)
  getAllUserWithQueryString(@Query() req: GetUserDto) {
    return req;
  }

  @Post('create-one')
  @ApiOperation({ summary: 'Create one user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create One User Data',
    type: ResponseCreateUserDto,
  })
  @UsePipes(ValidationPipe)
  createOneUser(@Body() req: CreateUserDto) {
    return this.userService.createUser(req);
    // return req;
  }

  @Put('update-one/:id')
  @ApiOperation({ summary: 'Update one user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update One User Data',
    type: ResponseCreateUserDto,
  })
  @UsePipes(ValidationPipe)
  updateOneUser(@Param() req: UpdateUserDto) {
    return this.userService.updateUser(req);
    // return req;
  }

  @Delete('delete-one/:id')
  @ApiOperation({ summary: 'Delete one user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete One User Data',
    type: ResponseCreateUserDto,
  })
  @UsePipes(ValidationPipe)
  deleteOneUser(@Param() id: number) {
    return this.userService.deleteUser(id);
    // return req;
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
