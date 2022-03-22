import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import BookBaseEntity from "./parent/BookBaseEntity";

@ObjectType()
export default class Book {

    
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
    abstract: string = ''

    @Column({
        type: 'simple-array',
        nullable: false
    })
    @Field( () => [String] )
    authors: string[] = []


    @Column()
    version: number = 1
    
    @CreateDateColumn()
    created_at: Date = new Date

    @UpdateDateColumn()
    updated_at: Date = new Date


}