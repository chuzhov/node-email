const { Contact } = require("../../models/index");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const dbAnswer = await Contact.create({
    ...req.body,
    owner,
  });

  res.status(201).json(dbAnswer);
};

module.exports = addContact;
