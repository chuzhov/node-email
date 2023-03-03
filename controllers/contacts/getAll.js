const { Contact } = require("../../models/index");
const {
  setPagination,
  setSort,
} = require("../../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user; //recieving data set by auth middleware
  const { page = 0, limit = 0 } = req.query;
  const { sort = "", sort_order = "" } =
    req.query;

  const dbAnswer = await Contact.find(
    { owner },
    "-createdAt -updatedAt -__v",
    {
      ...setPagination(page, limit),
      ...setSort(Contact, sort, sort_order),
    }
  );
  res.json(dbAnswer);
};

module.exports = getAllContacts;
