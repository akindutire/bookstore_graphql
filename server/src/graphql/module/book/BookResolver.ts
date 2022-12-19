import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { getMongoRepository } from "typeorm";

import Book from "../../../entity/Book";
import User from "../../../entity/User";
import ContextInf from "../../type/Context";
import { isAuth } from "../../middleware/isAuth";


@InputType()
class CreateBookInput {
   
    @Field( () => String! )
    name: string = ''

    @Field( () => String )
    isbn: string = ''

    @Field( () => String )
    abstract: string = ''

    @Field( () => [String!] )
    authors: string[] = []

}

@InputType()
class UpdateBookInput {
   
    @Field( () => String! )
    name: string = ''

    @Field( () => String )
    isbn: string = ''

    @Field( () => String )
    abstract: string = ''

    @Field( () => [String!] )
    authors: string[] = []

}

@Resolver()
export default class BookRes {

    @Query( () => [Book] )
    @UseMiddleware(isAuth)
    async getAll(
        @Ctx() { payload }: ContextInf
    ) : Promise<Book[]> {

        const bookRepo = getMongoRepository(Book)
        const userRepo = getMongoRepository(User)

        const u = await userRepo.findOne({ where: {email: payload!.email}, select:['id'] })
        if(!u) {
            throw new Error("User not found")
        }
        const b = await bookRepo.find({ where: {user_id: u.id} })

        return b
    }

    @Mutation( () => Book )
    @UseMiddleware(isAuth)
    async createBook(
        @Arg("input", () => CreateBookInput) input: CreateBookInput,
        @Ctx() { payload }: ContextInf
    ) : Promise<Book> {

        const bookRepo = getMongoRepository(Book)
        const userRepo = getMongoRepository(User)

        const book = bookRepo.create(input)
      

        const u = await userRepo.findOne({ where: {email: payload!.email}, select:['id'] })
        if(!u) {
            throw new Error("User not found")
        }

        book.user_id = u.id

        await book.save()

        return book;
    }

    @Mutation( () => Boolean )
    @UseMiddleware(isAuth)
    async updateBook(
        @Arg("book_isbn", () => String) book_isbn: string,
        @Arg("input", () => UpdateBookInput) input: UpdateBookInput,
        @Ctx() { payload }: ContextInf
    ) : Promise<boolean> {

        const bookRepo = getMongoRepository(Book)
        const userRepo = getMongoRepository(User)

        const b = await bookRepo.findOne({ where: {isbn: book_isbn} })
      
        if(!b) {
            throw new Error("Book not found")
        }

        await bookRepo.updateOne({isbn: book_isbn}, input)
        
        return true
    }

    @Mutation( () => Book )
    @UseMiddleware(isAuth)
    async getBook(
        @Arg("book_isbn", () => String) book_isbn: string,
        @Ctx() { payload }: ContextInf
    ) : Promise<Book> {

        const bookRepo = getMongoRepository(Book)
    
        const b = await bookRepo.findOne({ where: {isbn: book_isbn} })
      
        if(!b) {
            throw new Error("Book not found")
        }
        
        return b
    }

    @Mutation( () => Boolean )
    @UseMiddleware(isAuth)
    async deleteBook(
        @Arg("book_isbn", () => String) book_isbn: string,
        @Ctx() { payload }: ContextInf
    ) : Promise<Boolean> {

        const bookRepo = getMongoRepository(Book)
    
        const b = await bookRepo.deleteOne({ where: {isbn: book_isbn} })
        
        return true
    }
}