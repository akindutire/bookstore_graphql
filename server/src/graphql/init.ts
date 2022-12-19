import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import 'reflect-metadata'
import BookResvr from "./module/book/BookResolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import UserResvr from "./module/user/UserResolver";

class GraphqlInit { 

    public async init() {
        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [ BookResvr, UserResvr ],
                validate: false
            }),
            plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
            context: ({req, res}) => ({req, res})
        })
        return apolloServer
    }
}



export default GraphqlInit;