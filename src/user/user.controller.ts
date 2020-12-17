import { Body, Controller, Get, Post, ValidationPipe, UseGuards, Request, Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserAuthDto } from './dto/user-admin.dto';
import { UserAuthGuard } from './user-auth-guard/auth-user.guard';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    @Post()
    login(@Body(ValidationPipe) data: UserAuthDto) {
        return this.userService.userLogin(data);
    }
}
