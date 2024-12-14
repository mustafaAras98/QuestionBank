const ValidateEmailSchema = email => {
  const emailValidationRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailValidationRegEx.test(String(email))
    ? 'Valid'
    : 'Email must be valid.';
};

export default ValidateEmailSchema;
