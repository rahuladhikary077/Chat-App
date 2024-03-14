import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express();

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // (from req.body)
app.use(cookieParser()); // 

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

/*
app.get('/', (req, res) => {
    res.send("Server is Ready!");
});
*/





app.listen(PORT, ()=> {
    connectToMongoDB();
    console.log('listening on port: ' + PORT);
});