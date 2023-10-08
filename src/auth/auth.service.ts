import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePass } from 'src/user/bcrypt';
import { serializedUser } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {
        const userdb = await this.userService.findOneByEmail(email)
        if (userdb) {
            const matched = comparePass(password, userdb.password)
            if (matched) {
                return new serializedUser(userdb)
            } else {
                throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST)
            }
        }
        throw new HttpException('Invalid User or Password', HttpStatus.UNAUTHORIZED)
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            id: user.id,
            username: user.firstName,
        }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
