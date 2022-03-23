import { Field, ObjectType } from 'type-graphql';
import  {Entity, Column} from 'typeorm'
import Book from './Book';
import BookBaseEntity from './parent/BookBaseEntity';

export enum UserRole{
    CLIENT = 'CLIENT',
    ADMIN = 'ADMIN'
}

@Entity('users')
@ObjectType()
export default class User extends BookBaseEntity{

    @Column({
        nullable: false
    })
    @Field( () => String )
    name!: string

    @Column({
        unique: true,
        nullable: false
    })
    @Field( () => String )
    email!: string

    @Column({
        nullable: false
    })
    pwd!: string

    @Column({
        type: 'enum',
        nullable: false,
        enum: UserRole,
        default: UserRole.CLIENT
    })
    @Field( () => UserRole )
    role!: UserRole

}

