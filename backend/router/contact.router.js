const express = require("express");
const { addContact, getContacts, getContactsByUser, removeContact, updateContact, addContactByAdmin } = require("../controller/contact.controller");
let contactRouter = express.Router();

contactRouter.post("/addcontact", addContact)
contactRouter.post("/addContactByAdmin", addContactByAdmin)
contactRouter.delete("/removeContact/:id", removeContact)
contactRouter.put("/updateContact/:id", updateContact)
contactRouter.get("/contacts", getContacts)
contactRouter.get("/getContactsByUser", getContactsByUser)

module.exports = contactRouter  