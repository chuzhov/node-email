const { User } = require("../../models/index");

const confirmedByEmail = async (req, res) => {
  const { _id } = req.user;
  const dbAnswer = await User.findByIdAndUpdate(
    _id,
    { isEmailConfirmed: true, token: "" },
    {
      returnDocument: "after",
      select: "-password -token",
    }
  );
  res.status(200).json(dbAnswer);
};

module.exports = confirmedByEmail;
