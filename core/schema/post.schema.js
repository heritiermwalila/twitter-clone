const { model, Schema } = require("mongoose");

const Post = model(
  "Post",
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    pinned: Boolean,
  })
);

export default Post;
