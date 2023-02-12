import Posts from "../models/posts.js";
import User from "../models/user.js";
export const createPosts = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = User.findById(userId);
        const newPost = new Posts({
            userId,
            firstname: user.firstname,
            lastname: user.lastname,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const posts = await Posts.find();
        res.status(201).json(posts);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Posts.find({ userId });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* Update */
export const likePosts = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId, true);
        }
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);


    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}