
import express from "express";
import cors from "cors";



const app = express();
app.use(cors());
app.use(express.json());


import userRoute from "./src/routes/User.route.js";


// userRoutes
app.use("/api/v1/user", userRoute);


export { app }