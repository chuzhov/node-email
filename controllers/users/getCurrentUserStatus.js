const getCurrentUserStatus = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription, avatarURL });
};

module.exports = getCurrentUserStatus;
