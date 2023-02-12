import Express, { Router } from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFirends
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const userRoute = Express.Router();

userRoute.get("/:id", verifyToken, getUser);
userRoute.get("/:id/friends", verifyToken, getUserFriends);

userRoute.patch("/:id/:friendId",verifyToken, addRemoveFirends);

export default userRoute;