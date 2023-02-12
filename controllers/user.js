import User from "../models/user.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById({ id });
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById({ id });
        const friends = Promise.all(  // used to do multiple await methods parallely
            user.friends.map((id) => User.findById(id))  //getting user friends details and sorting in array
        );
        const formattedFriends = friends.map(
            ({ _id, firstname, lastname, occupation, location, picturePath }) => {
                return { _id, firstname, lastname, occupation, location, picturePath };  //getting only required details of friends and sorting in array
            }
        );
        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export const addRemoveFirends = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(id);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);  //update user friends and filter it from friendId
            friend.friends = friend.friends.filter((id) => id !== id); //update friend friends and filter it from userid
        }
        else{
            user.friends.push(friendId); //adding friend id to the user.friends array in usermodel
            friend.friends.push(id); //adding user id to the friend.friends array in usermodel
        }
        await user.save();
        await friend.update();

        const friends = Promise.all(  // used to do multiple await methods parallely
            user.friends.map((id) => User.findById(id))  //getting user friends details and sorting in array
        );
        const formattedFriends = friends.map(
            ({ _id, firstname, lastname, occupation, location, picturePath }) => {
                return { _id, firstname, lastname, occupation, location, picturePath };  //getting only required details of friends and sorting in array
            }
        );
        res.status(200).json(formattedFriends);


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}