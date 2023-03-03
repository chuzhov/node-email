const { Contact } = require("../../models/index");

const getOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const dbAnswer = await Contact.findById({
    _id: contactId,
    owner,
  });
  res.json(dbAnswer);
};

module.exports = getOneContact;
