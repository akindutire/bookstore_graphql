import config from '../../core/config'
import log from './logger'
import { createConnection } from 'typeorm'

export default class DatabaseSvc {
    public static async connect() {
        try{

            const connection = await createConnection({
                type: "mongodb",
                url: config.server.uri,
            })
            log.info("Connected to DB")
            
            return Promise.resolve(true)
        } catch (e) {
            log.error(e)
            return Promise.reject(false)
        }
    }
}