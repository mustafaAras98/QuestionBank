import {Enums} from '../../Constants/Enums';

const ValidateUsernameSchema = (username, minLength, maxLength) => {
  const usernameRegex = /^[a-zA-Z0-9._]+$/;

  if (!username) {
    return Enums.MESSAGE.Validations.UsernameNotFound;
  }
  if (typeof username !== 'string') {
    return Enums.MESSAGE.Validations.UsernameMustBeString;
  }
  if (username.length < minLength || username.length > maxLength) {
    return Enums.MESSAGE.Validations.UsernameCharacterMessage(
      minLength,
      maxLength,
    );
  }
  if (!usernameRegex.test(username)) {
    return Enums.MESSAGE.Validations.UsernameValidCharacters;
  }
  return Enums.STATUS.Success;
};

export default ValidateUsernameSchema;
