const { Contact } = require("../../models/index");
const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const removeContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const dbAnswer = await Contact.findOneAndDelete(
    { contactId, owner }
  );
  if (!dbAnswer)
    throw HttpError(
      404,
      `Not found. [id ${req.params.contactId}]`
    );
  res.json(dbAnswer);
};

module.exports = removeContact;
