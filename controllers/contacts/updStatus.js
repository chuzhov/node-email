const { Contact } = require("../../models/index");

const updContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;
  const dbAnswer = await Contact.findOneAndUpdate(
    { contactId, owner },
    req.body,
    { returnDocument: "after" }
  );
  res.status(200).json(dbAnswer);
};

module.exports = updContactStatus;
