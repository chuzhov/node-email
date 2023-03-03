const fs = require("fs/promises");
const Jimp = require("jimp");

const resizeAndMoveImg = async (
  { w, h },
  { origin, destination }
) => {
  const image = await Jimp.read(origin);
  await image
    .resize(w, h)
    .writeAsync(destination);
  await fs.unlink(origin);
  return true;
};

module.exports = resizeAndMoveImg;
