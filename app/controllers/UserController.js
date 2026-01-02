import User from "../models/User.js";
import bcrypt from "bcrypt";

//Create users and store in database

// export const createUser = async (req, res) => {
//     try{
//         const { firstname, lastname, username, email, password, gender } = req.body;

//         const existingUser = await User.findOne({where: {email}});
//         if(existingUser){
//             return res.status(400).json({message: "User already exists"});
//         };
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = await User.create({
//             firstname,
//             lastname,
//             username,
//             email,
//             password: hashedPassword,
//             gender
//         })
//         res.status(201).json({message: "User created successfully"});
//     } catch (err) {
//         res.status(500).json({message: "Server error", error: err.message});
// }};


//Get user by username from database

export const getUser =async (req, res) => {
    try {
        const {username} = req.params;
        const user = await User.findOne({where: {username}});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message});
    }   
}