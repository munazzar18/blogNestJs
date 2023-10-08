import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './createUserDto.dto';
import { serializedUser } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getUsers() {
        const allUsers = await this.userService.findAll()
        if (allUsers.length > 0) {
            return allUsers.map((user => new serializedUser(user)))
        } else {
            throw new HttpException('No users found', HttpStatus.NOT_FOUND)
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/id/:id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {

        const user = await this.userService.findOnebyId(id);
        if (user) {
            return new serializedUser(user)
        } else {
            throw new HttpException('User not found by for this id', HttpStatus.BAD_REQUEST);
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/email/:email')
    async getUserByEmail(@Param('email') email: string) {
        const user = await this.userService.findOneByEmail(email)
        if (user) {
            return new serializedUser(user)
        } else {
            throw new HttpException('No user found for this email', HttpStatus.BAD_REQUEST)
        }
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        try {
            const user = this.userService.findAll()
            if (user) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
            }
            else return this.userService.create(createUserDto)
        } catch (error) {
            throw error
        }

    }

    @Delete('/delete/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        try {
            const user = await this.userService.remove(id)
            if (user) {
                return "User deleted Successfully!"
            }
        } catch (error) {
            throw new HttpException('User not found for this id', HttpStatus.BAD_REQUEST)
        }
    }
}
