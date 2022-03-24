import express, {Express, Router} from "express";
import {guard} from '../middleware/auth'
import JwtSvc from "../service/util/JwtSvc";
import config from './config'
import container from "./service-registry";

export default function routeRegistry(app: Express) {

    const router = Router()

    router.get('/', (req, res, next) => {
        res.sendStatus(200)
    })

    router.get('/health', (req, res, next) => res.sendStatus(200) )

    router.post('/refresh-token', (req, res, next) => {
        let refCk = config.server.cookiePrefix+'refreshID'
        const refToken = req.cookies[refCk]

        if(!refToken) {
            return res.status(200).json({
                accessTokenRefreshed: false,
                accessToken: '',
                message: "Refresh token not found"
            })
        }

        let payload: any
        const jwt: JwtSvc = container.resolve('jwt')
        try {
            payload = jwt.getRefreshClaims(refToken)
        } catch (e) {
            return res.status(200).json({
                accessTokenRefreshed: false,
                accessToken: '',
                message: "Refresh token not valid"
            })
        }


        res.status(200).json({
            accessTokenRefreshed: true,
            accessToken: jwt.createAccessToken({email: payload.email}),
            message: "Refresh token valid"
        })
    })

    //Middleware
    app.use(guard)

    router.all('*', (req, res) => {
        res.status(404).json({
            msg: 'Route not found',
            data: []
        })
    })

    return router
}