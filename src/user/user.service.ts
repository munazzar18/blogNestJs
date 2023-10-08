import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './createUserDto.dto';
import { encodedPass } from './bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    findAll() {
        return this.userRepository.find()
    }

    findOnebyId(id: number) {
        return this.userRepository.findOneBy({ id })
    }

    findOneByEmail(email: string) {
        return this.userRepository.findOneBy({ email })
    }

    remove(id: number) {
        return this.userRepository.delete({ id })
    }

    create(createUserDto: CreateUserDto) {
        const password = encodedPass(createUserDto.password)
        const newUser = this.userRepository.create({ ...createUserDto, password })
        return this.userRepository.save(newUser)
    }
}
