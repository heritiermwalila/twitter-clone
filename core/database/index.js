
import mongoose from 'mongoose'
import {databases} from './config.json'

const {mongodb} = databases
const connectionString = `${mongodb.uri}:${mongodb.port}/${mongodb.database}`
// const connection = mongodb.connect(connectionString)

export {connectionString}


export default class Database {
    static connect(){
        return mongoose.connect(connectionString, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
    }
}