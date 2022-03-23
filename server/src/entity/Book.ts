import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ObjectID, UpdateDateColumn } from "typeorm";
import BookBaseEntity from "./parent/BookBaseEntity";

@ObjectType()
@Entity("books")
export default class Book extends BookBaseEntity {

    @Column({
        nullable: false
    })
    user_id!: ObjectID
    
    @Column({
        nullable: false,
    })
    @Field( () => String )
    name: string = ''

    @Column({
        nullable: false,
        length: 12,
        unique: true
    })
    @Field( () => String )
    isbn: string = ''

    @Column({
        type: 'text',
        nullable: false,
    })
    @Field( () => String )
    abstract!: string 

    @Field( () => String )
    context!: string

    @Column({
        type: 'simple-array',
        nullable: false
    })
    @Field( () => [String] )
    authors: string[] = []
    

}