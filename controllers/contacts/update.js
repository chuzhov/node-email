const { Contact } = require("../../models/index");

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const dbAnswer = await Contact.findOneAndUpdate(
    { contactId, owner },
    req.body,
    { returnDocument: "after" }
  );
  res.status(200).json(dbAnswer);
};

module.exports = updateContact;
