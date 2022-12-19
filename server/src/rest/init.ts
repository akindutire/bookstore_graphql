import express, {Express, json} from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import routeRegistry from './route-registry'

export default class RestInit {

    private restApp:Express

    constructor() {
        this.restApp = express()
    }

    init() : Express {
        
        this.restApp.use(json())
        this.restApp.use(cookieParser())

        this.initCorsCfg()
        this.registerRoutes()
        
        return this.restApp
    }

    

    private initCorsCfg() {
        const props = { origin: ['127.0.0.1'], method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }
        this.restApp.use(
            cors({
                origin: props.origin,
                methods: props.method,
                maxAge: 3600
            })
        )
    } 

    private registerRoutes() {
        const router = routeRegistry(this.restApp)
        this.restApp.use('/api/', router)
    }

    
}