import {config} from 'dotenv'
config();

export default {

    server: {
        uri: process.env.DB_URI,
        host : process.env.HOST,
        port : process.env.PORT
    },
    jwt: {
        secret: process.env.JWT_SECRET
    }
}