const ValidateUsernameSchema = (username, minLength, maxLength) => {
  const usernameRegex = /^[a-zA-Z0-9._]+$/;

  if (!username) {
    return 'Please enter a username.';
  }
  if (typeof username !== 'string') {
    return 'Username must be a valid text.';
  }
  if (username.length < minLength || username.length > maxLength) {
    return `Username must be between ${minLength} and ${maxLength} characters long.`;
  }
  if (!usernameRegex.test(username)) {
    return 'Usernames can only use letters, numbers, underscores, and periods.';
  }
  return 'Valid';
};

export default ValidateUsernameSchema;
