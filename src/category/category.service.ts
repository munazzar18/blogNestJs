import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './createCategoryDto.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    async findAll() {
        return this.categoryRepository.find()
    }

    async findById(id: number) {
        const category = await this.categoryRepository.findOneBy({ id })
        return category
    }

    async create(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto)
        return this.categoryRepository.save(category)
    }


}
