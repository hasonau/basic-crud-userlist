import { Router } from "express";
import {addUser,getAllUsers,clearAllUsers,deleteUser,getUser,updateUser} from "../controllers/user.controller.js";


const userRoute = Router();

// userRoutes
userRoute.route("/addUser").post(addUser);
userRoute.route("/updateUser/:id").put(updateUser);
userRoute.route("/getUsers").get(getAllUsers);
userRoute.route("/getUser/:id").get(getUser);
userRoute.route("/clearUsers").post(clearAllUsers);
userRoute.route("/deleteUser/:id").delete(deleteUser);

export default userRoute;
