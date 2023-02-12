import Express from "express";
import { login } from "../controllers/auth.js";

const authRouter = Express.Router();
authRouter.post("/login", login);

export default authRouter;