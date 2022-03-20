import express, {Express, Router} from "express";
import {guard} from '../middleware/auth'

export default function routeRegistry(app: Express) {

    const router = Router()

    router.get('/', (req, res, next) => {
        res.sendStatus(200)
    })

    router.get('/health', (req, res, next) => res.sendStatus(200) )

    router.post('/register', (req, res, next) => {
        res.status(200).json({
            data: 'I am alive'
        })
    })

    router.post('/login', (req, res, next) => {
        res.status(200).json({
            data: 'I am alive'
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