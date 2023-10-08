import { Category } from "src/category/category.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: ""
    })
    title: string;

    @Column({
        nullable: false,
        default: ""
    })
    description: string;

    @Column({
        nullable: false,
        default: "default.png"
    })
    image: string;

    @Column({
        nullable: false,
    })
    categoryId: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        nullable: false,
    })
    userId: number;


    @JoinColumn({ name: 'userId' })
    @ManyToOne(() => User, (user) => user.blogs)
    user: User;

    @JoinColumn({ name: 'categoryId' })
    @ManyToOne(() => Category, (category) => category.blogs)
    category: Category;


}