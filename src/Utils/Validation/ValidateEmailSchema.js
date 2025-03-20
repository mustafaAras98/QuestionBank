import {Enums} from '../../Constants/Enums';

const ValidateEmailSchema = (email, t) => {
  const emailValidationRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailValidationRegEx.test(String(email))
    ? Enums.STATUS.Success
    : t('validationErrors.EmailValidErrors');
};

export default ValidateEmailSchema;
