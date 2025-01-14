import {
  createUserWithEmailAndPassword,
  firebase,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from '@react-native-firebase/auth';
import firestore, {
  getDocs,
  query,
  where,
} from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {WEB_CLIENT_ID} from '@env';
import {usersCollection} from '../Constants/Collections';
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

    await updateProfile(userCredential.user, {displayName: user.Username});
    let timeStamp = firestore.FieldValue.serverTimestamp();
    await usersCollection.doc(userCredential.user.uid).set({
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
  try {
    if (auth.currentUser) {
      auth.signOut();
    }
  } catch (error) {
    return error.code;
  }
};
const forgetPassword = async email => {
  let emailTrimmed = email.trim();
  let emailValidate = ValidateEmailSchema(emailTrimmed);
  if (emailValidate !== Enums.STATUS.Success) {
    return emailValidate;
  }
  try {
    const q = query(usersCollection, where('user.Email', '==', emailTrimmed));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return Enums.MESSAGE.Errors.EmailDontExists;
    }
    await sendPasswordResetEmail(auth, emailTrimmed);
    return Enums.MESSAGE.ForgetPasswordSucces;
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
const signInWithGoogle = async () => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const signInResult = await GoogleSignin.signIn();
    let idToken = signInResult.data.idToken;
    if (!idToken) {
      idToken = signInResult.idToken;
    }
    if (!idToken) {
      return Enums.MESSAGE.Errors.IDTokenError;
    }
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(
      signInResult.data.idToken,
    );
    auth
      .signInWithCredential(googleCredential)
      .then(() => saveGoogleUserToFirestore(auth.currentUser));

    return Enums.MESSAGE.LoginSuccess;
  } catch (error) {
    return error.code;
  }
};
const saveGoogleUserToFirestore = async userParam => {
  if (!userParam) {
    return null;
  }
  try {
    const userDoc = usersCollection.doc(userParam.uid);
    const userSnapshot = await userDoc.get();

    if (!userSnapshot.exists) {
      const user = new User(
        userParam.email.trim(),
        userParam.displayName.trim(),
      );
      let timeStamp = firestore.FieldValue.serverTimestamp();
      await usersCollection.doc(userParam.uid).set({
        user,
        createdAt: timeStamp,
      });
    }
    return Enums.MESSAGE.SignUpSuccess;
  } catch (error) {
    return error;
  }
};
const authService = {
  createUserWithEmail,
  signInWithEmail,
  signInWithGoogle,
  logout,
  forgetPassword,
};

export default authService;
