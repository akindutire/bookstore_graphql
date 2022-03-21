import { Field, ObjectType } from 'type-graphql';
import  {BaseEntity, Entity, Column, OneToMany} from 'typeorm'
import Book from './Book';
import BookBaseEntity from './parent/BookBaseEntity';

@Entity('users')
@ObjectType()
export default class User extends BookBaseEntity{

    @Column({
        nullable: false
    })
    @Field( () => String )
    name: string = '';

    @Column({
        unique: true,
        nullable: false
    })
    @Field( () => String )
    email: string = ''

    @Column({
        nullable: false
    })
    pwd: string = ''

    @OneToMany(
        () => Book,
        book => book.user
    )
    @Field( () => [Book] )
    books: Book[] | undefined
}