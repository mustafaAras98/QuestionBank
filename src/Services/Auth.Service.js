import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {usersCollection} from '../Constants/Collections';

import firestore from '@react-native-firebase/firestore';

import {Enums} from '../Constants/Enums';
import User from '../Models/User';

import ValidateEmailSchema from '../Utils/Validation/ValidateEmailSchema';
import ValidateUsernameSchema from '../Utils/Validation/ValidateUsernameSchema';
import ValidatePasswordSchema from '../Utils/Validation/ValidatePasswordSchema';

const auth = getAuth();

const createUserWithEmail = async userParam => {
  const user = new User(userParam.Email.trim(), userParam.Username.trim());
  const password = userParam.Password.trim();

  let emailValidate = ValidateEmailSchema(user.Email);
  let usernameValidate = ValidateUsernameSchema(user.Username, 8, 18);
  let passwordValidate = ValidatePasswordSchema(password, 8, 18);

  let validateMessage = '';
  if (emailValidate !== Enums.STATUS.Success) {
    validateMessage += `${emailValidate} \n`;
  }
  if (usernameValidate !== Enums.STATUS.Success) {
    validateMessage += `${usernameValidate} \n`;
  }
  if (passwordValidate !== Enums.STATUS.Success) {
    validateMessage += `${passwordValidate}`;
  }
  if (validateMessage !== '') {
    return validateMessage;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.Email,
      password,
    );
    const userId = userCredential.user.uid;

    let timeStamp = firestore.FieldValue.serverTimestamp();
    await usersCollection.doc(userId).set({
      user,
      createdAt: timeStamp,
    });
    return Enums.MESSAGE.SignUpSuccess;
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return Enums.MESSAGE.Errors.EmailAlreadyExists;
      case 'auth/invalid-email':
        return Enums.MESSAGE.Errors.InvalidEmail;
      case 'auth/operation-not-allowed':
        return Enums.MESSAGE.Errors.OperationNotAllowed;
      case 'auth/weak-password':
        return Enums.MESSAGE.Errors.WeakPassword;
      case 'auth/network-request-failed':
        return Enums.MESSAGE.Errors.NetworkRequestFailed;
      default:
        return Enums.MESSAGE.Errors.UnknownError;
    }
  }
};
const signInWithEmail = async userParam => {
  let email = userParam.Email.trim();
  let password = userParam.Password.trim();

  let emailValidate = ValidateEmailSchema(email);
  let passwordValidate = ValidatePasswordSchema(password, 8, 18);

  let validateMessage = '';
  if (emailValidate !== Enums.STATUS.Success) {
    validateMessage += `${emailValidate} \n`;
  }
  if (passwordValidate !== Enums.STATUS.Success) {
    validateMessage += `${passwordValidate}`;
  }
  if (validateMessage !== '') {
    return validateMessage;
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return Enums.MESSAGE.LoginSuccess;
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-credential':
        return Enums.MESSAGE.Errors.InvalidCredential;
      case 'auth/operation-not-allowed':
        return Enums.MESSAGE.Errors.OperationNotAllowed;
      case 'auth/network-request-failed':
        return Enums.MESSAGE.Errors.NetworkRequestFailed;
      case 'auth/too-many-requests':
        return Enums.MESSAGE.Errors.TooManyRequest;
      default:
        return Enums.MESSAGE.Errors.UnknownError;
    }
  }
};
const logout = async () => {
  if (auth.currentUser) {
    auth.signOut();
  }
};
const authService = {
  createUserWithEmail,
  signInWithEmail,
  logout,
};

export default authService;
