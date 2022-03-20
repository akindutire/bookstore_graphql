import { asClass, asValue, AwilixContainer, createContainer } from "awilix";
import { scopePerRequest } from 'awilix-express';
import {Express} from "express";

export default function serviceRegistry(app: Express) {

    const container = createContainer()
    app.use(scopePerRequest(container))
    
    // container.register({

    // })
   
}