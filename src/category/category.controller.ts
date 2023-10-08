import { Body, Controller, Get, Injectable, Param, ParseIntPipe, Post, Request } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './createCategoryDto.dto';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) { }

    @Get()
    async allCategories() {
        try {
            const categories = await this.categoryService.findAll()
            return categories
        } catch (error) {
            throw error
        }
    }

    @Get('/:id')
    async categoryById(@Param('id', ParseIntPipe) id: number) {
        try {
            const category = await this.categoryService.findById(id)
            return category
        } catch (error) {
            throw error
        }
    }

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        // createCategoryDto.blogId = req.blog.blogId
        return this.categoryService.create(createCategoryDto)
    }

}
