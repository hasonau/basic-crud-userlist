    import { app } from "./app.js"
    import dotenv from "dotenv";
    import connectDB from "./src/db/index.js"

    dotenv.config();


    await connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })