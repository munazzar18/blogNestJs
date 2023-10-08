import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { FindManyOptions, ILike, In, Repository } from 'typeorm';
import { CreateBlogDto } from './createBlogDto.dto';
import { UpdateBlogDto } from './updateBlogDto.dto';
import { User } from 'src/user/user.entity';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';


@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(Blog)
        private blogRepository: Repository<Blog>,
    ) { }

    // async paginate(options: IPaginationOptions) {
    //     return paginate<Blog>(this.blogRepository, options)
    // }


    async allBlogs(skip: number, page: number) {
        const blogs = await this.blogRepository.find({
            order: {
                id: 'ASC'
            },
            skip: skip,
            take: page,
        })
        return blogs
    }

    async filterByCategory(categoryIds: number[]) {
        const blogs = await this.blogRepository.find({
            where: {
                categoryId: In(categoryIds)
            }
        })

        if (blogs.length === 0) {
            throw new NotFoundException('No blog for this category found')
        }
        else {
            return blogs
        }
    }

    async searchFilter(search: string) {
        const blogs = await this.blogRepository.find({
            where: [
                { title: ILike(`%${search}%`) },
                { description: ILike(`%${search}%`) }
            ],
        })

        if (blogs.length === 0) {
            throw new NotFoundException(`No blog found against ${search}`)
        }
        else return blogs
    }

    async blogById(id: number) {
        const oneBlog = await this.blogRepository.findOneBy({ id })
        return oneBlog
    }

    create(createBlogDto: CreateBlogDto, user: User) {
        const blog = this.blogRepository.create({ ...createBlogDto, userId: user.id })
        return this.blogRepository.save(blog)
    }

    async remove(id: number, user: User) {
        const blog = await this.blogRepository.findOne({
            where: {
                id: id,
                userId: user.id,
            }
        })
        if (!blog) {
            throw new UnauthorizedException('Not allowed to delete this blog')
        }
        else {
            return this.blogRepository.delete(id)
        }
    }

    async change(id: number, updateBlogDto: UpdateBlogDto, user: User) {
        const blog = await this.blogRepository.findOne({
            where: {
                id: id,
                userId: user.id,
            },
        })
        if (!blog) {
            throw new UnauthorizedException('Not allowed to update this blog')
        }
        else {
            blog.title = updateBlogDto.title;
            blog.description = updateBlogDto.description;
            blog.image = updateBlogDto.image;
            return this.blogRepository.save(blog)
        }
    }



}
