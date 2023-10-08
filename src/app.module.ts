import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { Blog } from './blog/blog.entity';
import { DataSource } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'blogger',
      autoLoadEntities: true,
      entities: [User, Blog, Category],
      synchronize: true,

    }),
    UserModule,
    BlogModule,
    CategoryModule,
    AuthModule,
    MulterModule.register({
      dest: './uploads',
    }),

  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
