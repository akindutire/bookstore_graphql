import { MiddlewareFn } from "type-graphql";
import JwtSvc from "../../service/util/JwtSvc";
import ContextInf from "../Context";
import container from './../../core/service-registry'

export const isAuth:MiddlewareFn<ContextInf> = ({context}, next) => {

    if(!context.req.header('x_authorization')) {
        throw new Error("Access key not found in x_authorization header")
    }

    let bearer_token: string = context.req.header('x_authorization')!
    let token = bearer_token.replace('Bearer', '')!.trim()

    const jwt:JwtSvc = container.resolve('jwt')

    const payload = jwt.getClaims(token)

    if(!payload) {
        throw new Error("Access token seems invalid, login!")
    }

    
    return next()
}