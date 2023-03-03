const { User } = require("../../models/index");
const {
  setPagination,
  setSort,
} = require("../../helpers");

const getAllUsers = async (req, res) => {
  const { page = 0, limit = 0 } = req.query;
  const { sort = "", sort_order = "" } =
    req.query;

  const dbAnswer = await User.find(
    {},
    "-password -token",
    {
      ...setPagination(page, limit),
      ...setSort(User, sort, sort_order),
    }
  );
  res.json(dbAnswer);
};

module.exports = getAllUsers;
