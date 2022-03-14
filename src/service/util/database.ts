import { connect } from "mongoose";
import config from './../../core/config'

export default class DatabaseSvc {
    public static async connect() {
        try{
            connect(config.server.uri).then( (res) => {
                console.log("Connected to DB")
            } )
        } catch (e) {
            console.log(e)
        }
    }
}