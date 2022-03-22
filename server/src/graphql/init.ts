import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import 'reflect-metadata'
import BookRes from "./resolver/Book";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import UserRes from "./resolver/User";

class GraphqlInit { 

    public async init() {
        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [ BookRes, UserRes ],
                validate: false
            }),
            plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
            context: ({req, res}) => ({req, res})
        })
        return apolloServer
    }
}



export default GraphqlInit;