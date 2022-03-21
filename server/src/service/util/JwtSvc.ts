import { sign } from 'jsonwebtoken'
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
}