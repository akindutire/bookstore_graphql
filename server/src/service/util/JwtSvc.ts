import { JwtPayload, sign, verify } from 'jsonwebtoken'
import config from '../../core/config'

export default class JwtSvc{

    private secret 

    constructor() {
        this.secret = config.jwt.secret!
    }

    public createAccessToken(payload: object) : string {
        return sign(payload, this.secret, {expiresIn: "5min"} )
    }

    public createRefreshToken(payload: object) : string {
        return sign(payload, this.secret+'_REFRESH', {expiresIn: "7d"} )
    }

    public getClaims(token: string) : JwtPayload | string {
        return verify(token, this.secret)
    }
}