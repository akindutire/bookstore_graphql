import  {BaseEntity, Entity, Column, OneToMany} from 'typeorm'
import Book from './Book';
import BookBaseEntity from './parent/BookBaseEntity';

@Entity('users')
export default class User extends BookBaseEntity{

    @Column({
        nullable: false
    })
    name: string = '';

    @Column({
        unique: true,
        nullable: false
    })
    email: string = ''

    @Column({
        nullable: false
    })
    pwd: string = ''

    @OneToMany(
        () => Book,
        book => book.user
    )
    books: Book[] | undefined
}