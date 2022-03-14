import {config} from 'dotenv'
config();

export default {

    server: {
        uri: process.env.DB_URI.toString(),
        host : process.env.HOST.toString(),
        port : parseInt(process.env.PORT)
    } 
}