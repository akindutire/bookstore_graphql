import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import Book from "../../entity/Book";
import User from "../../entity/User";

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
    async createBook(
        @Arg("user_email", () => String) email: string,
        @Arg("input", () => CreateBookInput) input: CreateBookInput
    ) {

        const book = Book.create(input)
        // book.user = await User.find({
        //     where: {email: input.user_email}
        // })

        book.user = await User.findOne({email})

        await book.save()
    }
}