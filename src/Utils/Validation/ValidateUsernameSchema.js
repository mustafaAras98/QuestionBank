import {Enums} from '../../Constants/Enums';

const ValidateUsernameSchema = (username, minLength, maxLength, t) => {
  const usernameRegex = /^[a-zA-Z0-9._]+$/;
  let errors = '';
  if (!username) {
    return t('validationErrors.UsernameNotFound');
  }
  if (typeof username !== 'string') {
    errors += t('validationErrors.UsernameMustBeString') + '\n';
  }
  if (username.length < minLength || username.length > maxLength) {
    errors +=
      t('validationErrors.UsernameCharacterMessage', {
        min: minLength,
        max: maxLength,
      }) + '\n';
  }
  if (!usernameRegex.test(username)) {
    errors += t('validationErrors.UsernameValidCharacters');
  }

  if (errors !== '') {
    return errors.trim();
  }
  return Enums.STATUS.Success;
};

export default ValidateUsernameSchema;
