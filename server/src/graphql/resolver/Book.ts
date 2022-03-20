import { Query, Resolver } from "type-graphql";

@Resolver()
export default class Book {

    @Query( () => String )
    getAll() : string{
        return 'I worked'
    }
}