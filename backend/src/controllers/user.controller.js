import User from "../models/User.model.js";
import {ApiError} from "../utils/ApiError.utils.js";
import{ ApiResponse} from "../utils/ApiResponse.utils.js";

/**
 * Controller to add a new user to the database.
 * Validates required fields and checks for duplicate email.
 */
const addUser = async (req,res)=>{
    try{
        const {username,email,password,age} = req.body;

        if(!username || !email || !password || !age){
            throw new ApiError(400,"All fields are required");
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new ApiError(409,"Email already in use");
        }

        const newUser = new User({username,email,password,age});
        await newUser.save();

        res
        .status(201)
        .json(new ApiResponse(true,newUser,"User created successfully"));

    }catch(error){
        if(error instanceof ApiError){
            res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }else{
            res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
        }
    }
}

/**
 * Controller to fetch all users from the database.
 */
const getAllUsers= async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(new ApiResponse(true,users,"Users fetched successfully"));
    }catch(error){
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
}

/**
 * Controller to delete all users from the database.
 */
const clearAllUsers = async (req, res) => {
    try {
        await User.deleteMany();
        res.status(200).json(new ApiResponse(200, null, "All users cleared successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
};

/**
 * Controller to delete a specific user by ID.
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
};

/**
 * Controller to fetch a specific user by ID.
 */
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        } else {
            res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
        }
    }
};

/**
 * Controller to update a user's details by ID.
 * Validates required fields and checks for duplicate email.
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, age } = req.body;

    if (!username || !email || !password || !age) {
      throw new ApiError(400, "All fields are required");
    }

    // Check if email belongs to another user
    const existingUser = await User.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      throw new ApiError(409, "Email already in use");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password, age },
      { new: true }
    );

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
    } else {
      res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
  }
};

export  {
    addUser,
    getAllUsers,
    clearAllUsers,
    getUser,
    deleteUser,
    updateUser
};