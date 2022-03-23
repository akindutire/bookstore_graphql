import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { getMongoRepository } from "typeorm";

import Book from "../../entity/Book";
import User from "../../entity/User";
import ContextInf from "../Context";
import { isAuth } from "../middleware/isAuth";


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

    @Query( () => String )
    getAll() : string{
        return 'I worked'
    }

    @Mutation( () => Book )
    @UseMiddleware(isAuth)
    async createBook(
        @Arg("input", () => CreateBookInput) input: CreateBookInput,
        @Ctx() { payload }: ContextInf
    ) {

        const bookRepo = getMongoRepository(Book)
        const userRepo = getMongoRepository(User)

        const book = bookRepo.create(input)
      

        const u = await userRepo.findOne({ where: {email: payload!.email}, select:['id'] })
        if(!u) {
            throw new Error("User not found")
        }

        book.user_id = u.id

        await book.save()
    }
}