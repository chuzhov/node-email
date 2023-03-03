const isGravatarURL = (URL) => {
  return URL.toLowerCase().includes("gravatar");
};

module.exports = isGravatarURL;
