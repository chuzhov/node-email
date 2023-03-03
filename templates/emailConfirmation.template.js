const emailConfirmationTemplate = (
  username = "",
  confirmationLink
) => {
  return `<p>Hello${
    ", " + username
  }!</p><p>Please click <a href="${confirmationLink}">this link</a> to confirm your email address.</p>`;
};

module.exports = emailConfirmationTemplate;
