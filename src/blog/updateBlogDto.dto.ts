import { IsNotEmpty, MinLength } from "class-validator";


export class UpdateBlogDto {

    @IsNotEmpty()
    @MinLength(5)
    title: string;

    @IsNotEmpty()
    @MinLength(10)
    description: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    categoryId: number;
}