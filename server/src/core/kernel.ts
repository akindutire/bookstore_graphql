import express, {Express, json} from "express";
import cookieParser from 'cookie-parser'
import Database from "./database";
import config from "./config";


import log from '../service/util/logger'
import GraphqlInit from "../graphql/init";
import RestInit from "../rest/init";

export default class App {

    private restApp:Express

    constructor() {
        this.restApp = express()
        this.restApp.use(json())
        this.restApp.use(cookieParser())
    }


    public boot() {
        
        try{
            
           
            this.exceptionHandler()    

            const graphqlInit = new GraphqlInit()
            graphqlInit.init()
                .then( async (apolloSrv) => {

                    await apolloSrv.start()
                    
                    let app = new RestInit().init();

                    apolloSrv.applyMiddleware({app})
                    
                    this.connectDB()
                        .then( (res) => {

                            this.restApp.listen( parseInt(config.server.port!), config.server.host!, () => {
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


    private async connectDB() {
        return Database.connect()
    }

    private exceptionHandler() {
        process.on('uncaughtException', (e) => {
            log.error(e)
        })
    }

} 






