import express, {Express} from "express";
export default function routeRegistry(app: Express) {

    app.use('/', (req, res, next) => {
        res.status(200).json({
            data: 'I am alive'
        })
    })

    //Middleware
}