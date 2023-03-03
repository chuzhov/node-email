const { User } = require("../../models/index");

const updUserSubscription = async (req, res) => {
  const { userId } = req.params;
  const dbAnswer = await User.findByIdAndUpdate(
    userId,
    req.body,
    {
      returnDocument: "after",
      select: "-password",
    }
  );
  res.status(200).json(dbAnswer);
};

module.exports = updUserSubscription;
