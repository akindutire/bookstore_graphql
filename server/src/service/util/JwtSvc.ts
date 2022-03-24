import { JwtPayload, sign, verify } from 'jsonwebtoken'
import config from '../../core/config'

export default class JwtSvc{

    private secret 
    private refreshSecret

    constructor() {
        this.secret = config.jwt.secret!
        this.refreshSecret = this.secret+'_REFRESH'
    }

    public createAccessToken(payload: object) : string {
        return sign(payload, this.secret, {expiresIn: "5min"} )
    }

    public createRefreshToken(payload: object) : string {
        return sign(payload, this.refreshSecret, {expiresIn: "7d"} )
    }

    public getClaims(token: string) : JwtPayload | string {
        return verify(token, this.secret)
    }

    public getRefreshClaims(token: string) : JwtPayload | string {
        return verify(token, this.refreshSecret)
    }
}