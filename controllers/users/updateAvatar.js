const path = require("path");
const fs = require("fs/promises");

const { User, USER_AVATAR_PARAMS } = require("../../models/index"); // prettier-ignore
const { HttpError } = require("../../routes/errors/HttpErrors"); // prettier-ignore
const { isInTheArray } = require("../../routes/validation"); // prettier-ignore
const resizeAndMoveImg = require("../../helpers/resizeAndMoveImg");

const updateUsersAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "image file is missing");
  }

  //   console.log(req?.file);  -- this is just a reminder for my future pojects
  //   {
  //     fieldname: 'avatar',
  //     originalname: 'D.png',
  //     encoding: '7bit',
  //     mimetype: 'image/png',
  //     destination: '/Users/danchuzhov/Documents/GitHub/goit-node-hw-05-expr-file-upl/uploads',
  //     filename: 'D.png',
  //     path: '/Users/danchuzhov/Documents/GitHub/goit-node-hw-05-expr-file-upl/uploads/D.png',
  //     size: 25367
  //   }

  const { _id } = req.user;
  const { path: uploadPathname, originalname } = req.file; // prettier-ignore
  const avatarsStorage = path.join( __dirname, "../../", "public", "avatars"); // prettier-ignore

  if (
    !isInTheArray(
      path.extname(uploadPathname),
      USER_AVATAR_PARAMS.acceptableFileTypes
    )
  ) {
    await fs.unlink(originalname);
    throw HttpError(
      415, //415 Unsupported Media Type
      "Invalid file type. Acceptables are: ",
      USER_AVATAR_PARAMS.acceptableFileTypes.join(
        ", "
      )
    );
  }

  const newFilename = _id.toString() + path.extname(originalname); // prettier-ignore
  const saveAvatarTo = path.join( avatarsStorage, newFilename ); // prettier-ignore
  const avatarURL = path.join( "avatars", newFilename ); // prettier-ignore

  await resizeAndMoveImg(
    {
      w: USER_AVATAR_PARAMS.dimensions.width,
      h: USER_AVATAR_PARAMS.dimensions.height,
    },
    {
      origin: uploadPathname,
      destination: saveAvatarTo,
    }
  );
  await User.findByIdAndUpdate(_id, { avatarURL, }); // prettier-ignore
  res.json({ avatarURL, }); // prettier-ignore
};

module.exports = updateUsersAvatar;
