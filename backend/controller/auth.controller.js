const express = require('express');
const jwt = require("jsonwebtoken");
const { UserModel } = require('../model/auth.model');
const token_secret = process.env.TOKEN_KEY;
const { default: jwtDecode } = require("jwt-decode");
const jwt_decode = require('jwt-decode')
const validateUser = async (data) => {
  let { email, password } = data;
  try {
    let user = await UserModel.findOne({ email:email });

    if (user) {
      if (user.password==password) {
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};


const signupUser = async (req, res) => {
  let { email, password, firstname, lastname,phone } = req.body;
  try {
    let existing_user = await UserModel.findOne({ email: email });
    let existing_phone = await UserModel.findOne({ phone: phone });
    if (existing_user) {
      return res.send({
        code: 404,
        status: false,
        message: "Email already registerd"
      })
    }
    if (existing_phone) {
      return res.send({
        code: 404,
        status: false,
        message: "Phone Number already registerd"
      })
    }
    let user = await UserModel.create({ firstname: firstname, lastname: lastname, email: email, password: password,role:'admin',phone:phone })
    if (user) {
      return res.send({
        code: 200,
        data: user,
        status: true,
        message: "registerd succefully"
      })
    } else {
      return res.send({
        code: 404,
        status: false,
        message: "Invalid details"
      })
    }
  } catch (error) {
    let msg = ''
    if(error.errors?.phone){
      msg = 'Invalid Phone Number'
    }else{
      msg ='Something Went Wrong'
    }
    return res.send({
      code: 400,
      status: false,
      message: msg
    })
  }
}

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await validateUser({ email, password });
  if (user) {
    let fullname = user.firstname+" "+user.lastname
    let token = jwt.sign(
      { userId: user._id, email: user.email, fullname: fullname,role:user.role },
      token_secret,
      {
        expiresIn: "7 days",
      }
    );


    res.status(200).send({ code: 200, status: true, token, message: "Login Successfully" });
  } else {
    return res.send({ code: 404, status: false, message: "something went wrong" });
  }
};
const getUsers = async (req, res) => {
  let users = await UserModel.find()
  return res.send(users)
}
const getUserById = async (req, res) => {
  try {
    let Bearer = req.headers["authorization"]
      let splittoken = Bearer.split(" ")
      let token = splittoken[1]
      var user =  jwt_decode(token, token_secret)
      let existUser = await UserModel.findOne({_id:user.userId})
      
      const {firstname,lastname,email,phone} = existUser
      if(existUser){
        return res.status(200).send ({
          code:200,
          data:{firstname,lastname,email,phone},
        })
      }else{
        return res.send({
          code: 400,
          status: false,
          message: 'something went wrong'
        })
      }
  } catch (error) {
    return res.send({
      code: 500,
      status: false,
      message: error
    })
  }
}
const updateUserById = async (req, res) => {
  try {
    let Bearer = req.headers["authorization"]
    let splittoken = Bearer.split(" ")
    let token = splittoken[1]
    var user =  jwt_decode(token, token_secret)
    const { firstname, lastname,phone,email } = req.body
    let existing_user = await UserModel.findOneAndUpdate({ _id: user.userId },
       {
          '$set': {
             "firstname": firstname,
             "lastname": lastname,
             "phone": phone,
             "email": email
          },
       },
       { new: true }
    );

    if (existing_user) {
       return res.send({
          code: 200,
          data: existing_user,
          status: true,
          message: "User Updated succefully"
       })
    } else {
       return res.send({
          code: 404,
          status: false,
          message: "Invalid details"
       })
    }
 } catch (error) {
    return res.send({
       code: 500,
       status: false,
       message: error
    })
 }
}
module.exports = {
  loginUser,
  signupUser,
  getUsers,
  getUserById,
  updateUserById
}