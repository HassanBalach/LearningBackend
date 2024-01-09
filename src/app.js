import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.Origin_Point
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true , limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Importing routers
import {router} from "./routers/user.router.js";

// Decleration of routers
app.use("/api/v1/user", router)

//http://localhost:4000/api/v1/user/register
export { app }