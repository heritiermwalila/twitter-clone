import Post from "../core/schema/post.schema";

export const AddPost = async (req, res, next) => {
  try {
    const newPost = await new Post({
      content: req.body.content,
      user: req.session.user,
    }).save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
  }
};

export const GetPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate("user");
    res.status(200).json(posts);
  } catch (error) {}
};

export const GetPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.status(200).json(post);
  } catch (error) {}
};

export const EditPost = async (req, res, next) => {};

export const DeletePost = async (req, res, next) => {};
