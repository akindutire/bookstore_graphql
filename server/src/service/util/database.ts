import { connect } from "mongoose";
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
            
            connect(config.server.uri).then( (res) => {
                log.info("Connected to DB")
            } )
        } catch (e) {
            throw e
        }
    }
}