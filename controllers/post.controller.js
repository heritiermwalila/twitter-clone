import Post from "../core/schema/post.schema"

export const GetPost = async (req, res, next) => {
    try {
        const post = await Post.find({}).populate('user')
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
    }
}

export const AddPost = async (req, res, next) => {
    try {
        const post = await new Post(req.body.content).save()
    } catch (error) {
        
    }
}


export const EditPost = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}


export const DeletePost = async (req, res, next) => {

}