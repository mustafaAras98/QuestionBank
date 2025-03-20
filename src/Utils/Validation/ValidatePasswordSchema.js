import {Enums} from '../../Constants/Enums';

const ValidatePasswordSchema = (password, minLength, maxLength, t) => {
  const upperCaseLetter = /[A-Z]/;
  const lowerCaseLetter = /[a-z]/;
  const number = /[0-9]/;

  let errors = '';
  if (!password) {
    return t('validationErrors.PasswordNotFound');
  }
  if (typeof password !== 'string') {
    errors += t('validationErrors.PasswordFormatMessage') + '\n';
  }
  if (password.length < minLength || password.length > maxLength) {
    errors +=
      t('validationErrors.PasswordCharacterMessage', {
        min: minLength,
        max: maxLength,
      }) + '\n';
  }
  if (!upperCaseLetter.test(password)) {
    errors += t('validationErrors.PasswordAtLeastOneUppercase') + '\n';
  }
  if (!lowerCaseLetter.test(password)) {
    errors += t('validationErrors.PasswordAtLeastOneLowercase') + '\n';
  }
  if (!number.test(password)) {
    errors += t('validationErrors.PasswordAtLeastOneNumber') + '\n';
  }
  if (errors !== '') {
    return errors.trim();
  }
  return Enums.STATUS.Success;
};

export default ValidatePasswordSchema;
