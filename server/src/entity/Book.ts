import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BookBaseEntity from "./parent/BookBaseEntity";
import User from "./User";

@Entity('books')
export default class Book extends BookBaseEntity {

    @Column({
        nullable: false,
    })
    name: string = ''

    @Column({
        nullable: false,
        length: 12
    })
    isbn: string = ''

    @Column({
        type: 'text',
        nullable: false,
    })
    abstract: string = ''

    @Column({
        type: 'simple-array',
        nullable: false
    })
    authors: string[] = []

    @ManyToOne(
        () => User,
        user => user.books,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({ name: 'user_id' })
    user: User | undefined

}