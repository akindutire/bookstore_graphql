import { Response } from "express"
import PayloadInf from "../../graphql/type/Payload"
import config from "../../core/config"
import container from "../../core/service-registry"
import JwtSvc from "./JwtSvc"

export const sendRefreshToken = (res: Response, payload: PayloadInf) => {

    const jwt: JwtSvc = container.resolve('jwt')
    res.cookie(
        config.server.cookiePrefix+'refreshID', 
        jwt.createRefreshToken({ email: payload.email }),
        { httpOnly: true}
    )
}