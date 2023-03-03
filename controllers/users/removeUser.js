const path = require("path");
const fs = require("fs/promises");
const {
  Contact,
  User,
} = require("../../models/index");
const {
  HttpError,
} = require("../../routes/errors/HttpErrors");
const {
  isGravatarURL,
} = require("../../routes/validation");

const removeUser = async (req, res) => {
  const { userId } = req.params;
  const dbUserAnswer =
    await User.findOneAndDelete({
      _id: userId,
    }).select("-password -token -avatarURL");
  if (!dbUserAnswer)
    throw HttpError(
      404,
      `Not found. [id ${req.params.contactId}]`
    );
  const dbUsersContactsAnswer =
    await Contact.deleteMany({ owner: userId });

  if (!isGravatarURL(dbUserAnswer.avatarURL)) {
    const storedAvatarPath = path.join(
      __dirname,
      "../../",
      "public",
      dbUserAnswer.avatarURL
    );
    await fs.unlink(storedAvatarPath);
  }

  res.json({
    "User deleted": dbUserAnswer,
    "User`s contacts deleted":
      dbUsersContactsAnswer,
  });
};

module.exports = removeUser;
