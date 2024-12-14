const ValidatePasswordSchema = (password, minLength, maxLength) => {
  const upperCaseLetter = /[A-Z]/;
  const lowerCaseLetter = /[a-z]/;
  const number = /[0-9]/;

  if (!password) {
    return 'Please enter a password';
  }
  if (typeof password !== 'string') {
    return 'Please enter a valid password format.';
  }
  if (password.length < minLength || password.length > maxLength) {
    return `Password must be between ${minLength} and ${maxLength} characters long.`;
  }
  if (!upperCaseLetter.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (!lowerCaseLetter.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (!number.test(password)) {
    return 'Password must contain at least one number.';
  }
  return 'Valid';
};

export default ValidatePasswordSchema;
