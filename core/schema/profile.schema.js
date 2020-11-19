import {Schema, model} from 'mongoose'

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserProfile = model('UserProfile', profileSchema)

export default UserProfile