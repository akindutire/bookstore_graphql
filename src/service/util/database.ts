import { connect } from "mongoose";
import config from './../../core/config'
import log from './logger'

export default class DatabaseSvc {
    public static async connect() {
        try{
            connect(config.server.uri).then( (res) => {
                log.info("Connected to DB")
            } )
        } catch (e) {
            throw new Error(e)
        }
    }
}