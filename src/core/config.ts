import {config} from 'dotenv'
config();

export default {

    server: {
        host : process.env.HOST.toString(),
        port : parseInt(process.env.PORT)
    } 
}