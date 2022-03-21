import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import 'reflect-metadata'
import Book from "./resolver/Book";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

class GraphqlInit { 

    public async init() {
        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [ Book ],
                validate: false
            }),
            plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
            context: ({req, res}) => {
                const user = req.user || null
                return {user}
            }
        })
        return apolloServer
    }
}



export default GraphqlInit;