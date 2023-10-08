import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './createBlogDto.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateBlogDto } from './updateBlogDto.dto';
import { User } from 'src/user/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDto } from './upload.dto';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }

    // @Get()
    // async index(
    //     @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    //     @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    // ) {
    //     limit = limit > 100 ? 100 : limit
    //     return this.blogService.paginate({
    //         page,
    //         limit,
    //     })
    // }

    @Get()
    async getAllBlogs(
        @Query('skip', ParseIntPipe) skip: number,
        @Query('page', ParseIntPipe) page: number,
    ) {
        try {
            const blogs = await this.blogService.allBlogs(skip, page)
            return blogs
        } catch (error) {
            throw error
        }
    }
    @Get('category')
    async filteredBlogs(@Query('categoryId') categoryIds: number[]) {
        try {
            const blogs = this.blogService.filterByCategory(categoryIds)
            return blogs
        } catch (error) {
            throw error
        }
    }

    @Get('search')
    async searchByString(@Query('search') search: string) {
        try {
            const blogs = this.blogService.searchFilter(search)
            return blogs
        } catch (error) {
            throw error
        }
    }

    @Get('/:id')
    async blogById(@Param('id', ParseIntPipe) id: number) {
        try {
            const blog = await this.blogService.blogById(id)
            if (!blog) {
                throw new NotFoundException('Blog not found!')
            }
            else {
                return blog
            }
        } catch (error) {
            throw error
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    createBlog(@Body() createBlogDto: CreateBlogDto, @Request() req) {
        const userId: User = req.user
        return this.blogService.create(createBlogDto, userId)
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    async updateBlog(@Param('id', ParseIntPipe,) id: number, @Body() updateBlogDto: UpdateBlogDto, @Request() req) {
        try {
            const user: User = req.user
            return await this.blogService.change(id, updateBlogDto, user)
        } catch (error) {
            throw error
        }
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    async deleteBlog(@Param('id', ParseIntPipe) id: number, @Request() req) {
        try {
            const user: User = req.user
            await this.blogService.remove(id, user)
            return "Blog deleted successfully!"
        } catch (error) {
            throw error
        }
    }


    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/images',
            filename: (req, file, callback) => {
                const originalName = file.originalname;
                const extension = extname(originalName)
                const fileName = Date.now() + extension;
                callback(null, fileName)
            }
        })
    }))
    uploadImage(@Body() body: UploadDto, @UploadedFile() file: Express.Multer.File) {
        return 'uploads/images/' + file.filename
    }


}
