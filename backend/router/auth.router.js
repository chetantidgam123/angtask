const express = require("express");
const { signupUser, loginUser, getUserById, updateUserById, resetPass, getUsers, changeStatusUser, removeUser, updateUser } = require("../controller/auth.controller");
const { getContactsByUserById } = require("../controller/contact.controller");
let authRouter = express.Router();

authRouter.post("/signup", signupUser)
authRouter.put("/changeStatusUser", changeStatusUser)
authRouter.post("/login", loginUser)
authRouter.get("/getUserById", getUserById)
authRouter.get("/getContactsByUserById/:id", getContactsByUserById)
authRouter.get("/getUsers", getUsers)
authRouter.put("/updateUserById", updateUserById)
authRouter.put("/updateUser/:id", updateUser)
authRouter.put("/resetPass", resetPass)
authRouter.delete("/removeUser/:id", removeUser)

module.exports = authRouter