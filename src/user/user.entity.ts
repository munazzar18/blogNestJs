import { Exclude } from "class-transformer";
import { Blog } from "src/blog/blog.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: ""
    })
    firstName: string;

    @Column({
        nullable: false,
        default: ""
    })
    lastName: string;

    @Column({
        nullable: false,
        unique: true,
        default: ""
    })
    mobile: string;

    @Column({
        nullable: false,
        unique: true,
        default: ""
    })
    email: string;

    @Column({
        nullable: false,
        default: ""
    })
    password: string;

    @JoinColumn({ name: 'blogs' })
    @OneToMany(() => Blog, (blog) => blog.user)
    blogs: Blog[]
}

export class serializedUser {
    id: number;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<serializedUser>) {
        Object.assign(this, partial)
    }
}