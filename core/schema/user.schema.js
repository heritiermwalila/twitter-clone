import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,

    },
    lastname: {
        type: String
    },

    username:{
        unique: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    rememberme: {
        type: Boolean,
        required: false
    }
})

const User = model('User', userSchema)


export default User