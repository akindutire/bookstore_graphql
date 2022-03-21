import { asClass, asValue, AwilixContainer, createContainer, Lifetime } from "awilix";
import { scopePerRequest } from 'awilix-express';
import {Express} from "express";
import JwtSvc from "../service/util/JwtSvc";

export default function serviceRegistry(app: Express) {

    const container = createContainer()
    app.use(scopePerRequest(container))
    
    container.register({
        jwt : asClass(JwtSvc, {lifetime: Lifetime.SINGLETON})
    })
   
}