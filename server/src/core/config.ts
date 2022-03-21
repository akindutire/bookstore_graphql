import {config} from 'dotenv'
config();

export default {

    server: {
        uri: process.env.DB_URI,
        host : process.env.HOST,
        port : process.env.PORT,
        cookiePrefix: process.env.COOKIE_PREFIX
    },
    jwt: {
        secret: process.env.JWT_SECRET
    }
}