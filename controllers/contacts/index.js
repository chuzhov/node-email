const ctrlWrapper = require("../ctrlWrapper");

const getAllContacts = require("./getAll");
const addContact = require("./add");
const getOneContact = require("./getOne");
const removeContact = require("./remove");
const updateContact = require("./update");
const updContactStatus = require("./updStatus");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updContactStatus: ctrlWrapper(updContactStatus),
  removeContact: ctrlWrapper(removeContact),
};
