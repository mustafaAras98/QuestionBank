import {Enums} from '../../Constants/Enums';

const ValidatePasswordSchema = (password, minLength, maxLength) => {
  const upperCaseLetter = /[A-Z]/;
  const lowerCaseLetter = /[a-z]/;
  const number = /[0-9]/;

  if (!password) {
    return Enums.MESSAGE.Validations.PasswordNotFound;
  }
  if (typeof password !== 'string') {
    return Enums.MESSAGE.Validations.PasswordFormatMessage;
  }
  if (password.length < minLength || password.length > maxLength) {
    return Enums.MESSAGE.Validations.PasswordCharacterMessage(
      minLength,
      maxLength,
    );
  }
  if (!upperCaseLetter.test(password)) {
    return Enums.MESSAGE.Validations.PasswordAtLeastOneUppercase;
  }
  if (!lowerCaseLetter.test(password)) {
    return Enums.MESSAGE.Validations.PasswordAtLeastOneLowercase;
  }
  if (!number.test(password)) {
    return Enums.MESSAGE.Validations.PasswordAtLeastOneNumber;
  }
  return Enums.STATUS.Success;
};

export default ValidatePasswordSchema;
