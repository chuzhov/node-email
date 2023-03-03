const emailConfirmationTemplate = (
  confirmationLink
) => {
  return `<p>Hi there!</p><p>Please click <a href="${confirmationLink}">this link</a> to confirm your email address.</p>`;
};

module.exports = emailConfirmationTemplate;
