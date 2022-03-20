import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BookBaseEntity from "./parent/BookBaseEntity";
import User from "./User";

@Entity('books')
@ObjectType()
export default class Book extends BookBaseEntity {

    @Column({
        nullable: false,
    })
    @Field( () => String )
    name: string = ''

    @Column({
        nullable: false,
        length: 12
    })
    @Field( () => String )
    isbn: string = ''

    @Column({
        type: 'text',
        nullable: false,
    })
    @Field( () => String )
    abstract: string = ''

    @Column({
        type: 'simple-array',
        nullable: false
    })
    @Field( () => [String] )
    authors: string[] = []

    @ManyToOne(
        () => User,
        user => user.books,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({ name: 'user_id' })
    @Field( () => User )
    user: User | undefined

}