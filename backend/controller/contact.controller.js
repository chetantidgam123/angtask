const { contactModel } = require("../model/contact.model");
const jwt = require("jsonwebtoken")
const { default: jwtDecode } = require("jwt-decode");
const jwt_decode = require('jwt-decode')
const token_secret = process.env.TOKEN_KEY;
const addContact = async (req, res) => {
   try {
      let Bearer = req.headers["authorization"]
      let splittoken = Bearer.split(" ")
      let token = splittoken[1]
      var user =  jwt_decode(token, token_secret)
      const { fullname, address, zip, phone,email } = req.body
      let createdBy = ''
      if(user.role=='user'){
         createdBy = user.fullname
      }else{
         createdBy =user.role
      }
      let contact = await contactModel.create({userId:user.userId, fullname: fullname, address: address, zip: zip, phone: phone, email: email,createdBy:createdBy });
      if (contact) {
         return res.send({
            code: 200,
            data: contact,
            status: true,
            message: "Contact Added succefully"
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

const updateContact = async (req, res) => {
   try {
      const { id } = req.params
      const { fullname, address, zip, phone,email } = req.body
      let existing_cont = await contactModel.findOneAndUpdate({ _id: id },
         {
            '$set': {
               "fullname": fullname,
               "address": address,
               "zip": zip,
               "phone": phone,
               "email": email
            },
         },
         { new: true }
      );

      if (existing_cont) {
         return res.send({
            code: 200,
            data: existing_cont,
            status: true,
            message: "Contact Updated succefully"
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
         code: 404,
         status: false,
         message: error
      })
   }
}

const getContactById = async (req, res) => {
   let { id } = req.params;
   let product = await contactModel.findOne({ _id: id });
   if (product) {
      return res.send({
         data: product,
         message: ""
      })
   } else {
      return res.status(404).send({
         message: "Data not found"
      })
   }
}
const removeContact = async (req, res) => {
   try {
      const { id } = req.params;
      let deletedItem = await contactModel.findOneAndDelete({ _id: id }, { new: true })
      if (!deletedItem) {
         return res.status(404).send({
            code: 404,
            message: "Contact Not found"
         })
      }
      return res.send({
         code: 200,
         message: "Contact Removed Succesfully"
      })
   } catch (error) {
      return res.status(500).send({
         code: 500,
         message: error.error
      })
   }
}
const getContacts = async (req, res) => {
   let products = await contactModel.find()
   return res.send(products)
}
const getContactsByUser = async (req, res) => {
   try {
      let Bearer = req.headers["authorization"]
      let splittoken = Bearer.split(" ")
      let token = splittoken[1]
      var user =  jwt_decode(token, token_secret)
      let contacts = await contactModel.find({userId:user.userId })
      if(contacts){
         return res.send({
            code: 200,
            data: contacts,
            status: true,
            message: ""
         })
      }else{
         return res.send({
            code: 404,
            data: [],
            status: false,
            message: ""
         })
         
      }
   } catch (error) {
      return res.send({
         code: 500,
         data: [],
         status: false,
         message: error
      })
      
   }
}

module.exports = {
   getContacts,
   addContact,
   getContactById,
   updateContact,
   removeContact,
   getContactsByUser
}