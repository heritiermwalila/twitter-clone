import {Schema, model} from 'mongoose'

const Post = model('Post', new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    content: String,
    pinned: Boolean
}, {timestamps: true}))

export default Post