import mongoose from "mongoose";
const postSchema = mongoose.Schema(
    {
        id:{
            required: true,
            type: String,
        },
        firstname:{
            required: true,
            type: String,
        },
        lastname:{
            required: true,
            type: String,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes:{
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        }
    },
    {timeStamps: true}
);
const Post =  mongoose.model("Posts", postSchema);
export default Post;