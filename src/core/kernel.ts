import express, {Express} from "express";
import { asClass, asValue, AwilixContainer, createContainer } from "awilix";
import { scopePerRequest } from 'awilix-express';
import cors from 'cors'
import config from "./config";
import routeRegistry from './route-registry'
import serviceRegistry from "./service-registry";
import Database from "../service/util/database";
import log from '../service/util/logger'

export default class ExpreesApp {

    private app:Express
    private container: AwilixContainer;

    constructor() {
        this.app = express();
    }


    public boot() {
        

        this.initCorsCfg()
        this.registerServices()
        this.registerRoutes()

        this.exceptionHandler()    
        
        this.app.listen( config.server.port, config.server.host, () => {

            log.info(`Now listening on http://${config.server.host}@${config.server.port}`);

            this.connectDB()
        
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

    private connectDB() {
        Database.connect()
    }

    private registerServices() {
        serviceRegistry(this.app, this.container)
    }

    private registerRoutes() {
        const router = routeRegistry(this.app)

        this.app.use('/api/', router)
    }

    private exceptionHandler() {
        process.on('uncaughtException', (e) => {
            log.error(e)
        })
    }

} 






