const express = require("express");
const { signupUser, loginUser, getUserById, updateUserById } = require("../controller/auth.controller");
let authRouter = express.Router();

authRouter.post("/signup", signupUser)
authRouter.post("/login", loginUser)
authRouter.get("/getUserById", getUserById)
authRouter.put("/updateUserById", updateUserById)

  module.exports = authRouter