import { Router } from "express";
import { userRegister } from "../controllers/user.controllers.js";
import  {upload} from '../middlewares/Multer.middlewares.js';

const router = Router()

router.route("/register").post(
    upload.fields([{
        name: "avatar",
        minCount: 5
    },
    {
       name: "coverImage",
       maxCount: 5
    }]),
    userRegister)

export {router}