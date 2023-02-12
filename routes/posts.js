import Express from "express";
import {
    getFeedPosts,
    getUserPosts,
    likePosts
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const postRoutes = Express.Router();

/* Read */
postRoutes.get("/", verifyToken, getFeedPosts);
postRoutes.get("/:id/Posts", verifyToken, getUserPosts);

/* Update */
postRoutes.patch("/:id/like", verifyToken, likePosts);

export default postRoutes