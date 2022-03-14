import express, {Express} from "express";
import { asClass, asValue, AwilixContainer, createContainer } from "awilix";
import { scopePerRequest } from 'awilix-express';
import cors from 'cors'
import config from "./config";
import routeRegistry from './route-registry'
import serviceRegistry from "./service-registry";


export default class ExpreesApp {

    private app:Express
    private container: AwilixContainer;

    constructor() {
        this.app = express();
    }


    public boot() {
        

        this.initCorsCfg()
        this.registerServices()

        return this.app.listen( config.server.port, config.server.host, 0, () => {

            console.log(`Now listening on ${config.server.host}@${config.server.port}`);
            
        })
    }

    private initCorsCfg() {
        const props = { origin: ['127.0.0.1'], method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }
        this.app.use(
            cors({
                origin: props.origin,
                methods: props.method,
                maxAge: 3600
            })
        )

    }

    private registerServices() {
        
        this.container = createContainer()
        this.app.use(scopePerRequest(this.container))

        serviceRegistry(this.app, this.container)
    }

    private registerRoutes() {
        routeRegistry(this.app)
    }


} 






