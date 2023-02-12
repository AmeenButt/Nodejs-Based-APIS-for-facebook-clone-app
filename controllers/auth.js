import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/* Register */
export const register = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const userSaved = await newUser.save();
        if (userSaved) {
            res.status(201).json(userSaved);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

/* Login */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "User with this email does not exsists." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect Password." });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}