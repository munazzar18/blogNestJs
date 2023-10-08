import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]),
  JwtModule.register({
    secret: jwtConstants.secret,
  })
  ],
  controllers: [BlogController],
  providers: [BlogService],

})
export class BlogModule { }
