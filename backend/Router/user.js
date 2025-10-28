import express from "express"
import { addReadBook, deleteUser, getalluser, Login, logout, Register, updateUser, UserReabBook } from "../controller/user.js";
import { authenticates } from "../other/auth.js";

export const UserRouter= express.Router();


UserRouter.post("/Register",Register)
UserRouter.post("/Login",Login)
UserRouter.post("/Logout",logout)
UserRouter.get("/All",getalluser)
UserRouter.post("/Logout",logout)
UserRouter.delete("/Delete/:id",deleteUser)
UserRouter.put("/update/:id",updateUser)
UserRouter.post("/read/:id",authenticates,addReadBook)
UserRouter.get("/read/",authenticates,UserReabBook)