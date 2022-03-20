import config from './config'
import log from '../service/util/logger'
import { createConnection } from 'typeorm'

import User from '../entity/User'
import Book from '../entity/Book'

export default class DatabaseSvc {
    public static async connect() {
        try{

            const connection = await createConnection({
                type: "mongodb",
                url: config.server.uri,
                entities: [
                    User, Book
                ],
                synchronize: true
            })
            log.info("Connected to DB")
            
            return Promise.resolve(true)
        } catch (e) {
            log.error(e)
            return Promise.reject(false)
        }
    }
}