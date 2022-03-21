import express, {Express, json} from "express";
import cors from 'cors'
import config from "./config";
import routeRegistry from './route-registry'
import serviceRegistry from "./service-registry";
import Database from "./database";
import log from '../service/util/logger'
import GraphqlInit from "../graphql/init";

export default class ExpreesApp {

    private app:Express

    constructor() {
        this.app = express()
        this.app.use(json())
    }


    public boot() {
        
        try{
            
            this.initCorsCfg()
            this.registerServices()
            this.registerRoutes()
            this.exceptionHandler()    

            const graphqlInit = new GraphqlInit()
            graphqlInit.init()
                .then( async (apolloSrv) => {

                    await apolloSrv.start()
                    
                    let app = this.app;
                    apolloSrv.applyMiddleware({app})
                    
                    this.connectDB()
                        .then( (res) => {

                            this.app.listen( parseInt(config.server.port!), config.server.host!, () => {
                                log.info(`Now listening on http://${config.server.host}:${config.server.port}`);
                            })
                            
                        } )
                        .catch(e => log.error(e)) 
                } )
                .catch(
                     (e) => { throw e }
                 ) 

            

        } catch(e:any) {
            log.error(`App not started: ${e.message}`)
        }

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

    private async connectDB() {
        return Database.connect()
    }

    private registerServices() {
        serviceRegistry(this.app)
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






