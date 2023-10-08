import { Blog } from "src/blog/blog.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @JoinColumn({ name: 'blogs' })
    @OneToMany(() => Blog, (blog) => blog.category)
    blogs: Blog[]
}