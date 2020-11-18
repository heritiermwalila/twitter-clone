import {Schema, model} from 'mongoose'

const profileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId
    },
    image: {
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
    }
})

const UserProfile = model('UserProfile', profileSchema)

export default UserProfile