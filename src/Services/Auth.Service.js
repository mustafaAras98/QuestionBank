import {
  createUserWithEmailAndPassword,
  firebase,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from '@react-native-firebase/auth';
import firestore, {
  addDoc,
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
import handleFirebaseAuthError from '../Utils/FirebaseErrorHandler';

const auth = getAuth();

const createUserWithEmail = async userParam => {
  const user = new User(userParam.Email, userParam.Username);
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
    await saveNewUserToFirestore(userCredential, user);

    return Enums.MESSAGE.SignUpSuccess;
  } catch (error) {
    return handleFirebaseAuthError(error);
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
    return handleFirebaseAuthError(error);
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
    return handleFirebaseAuthError(error);
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
    return handleFirebaseAuthError(error);
  }
};
const saveGoogleUserToFirestore = async userParam => {
  if (!userParam) {
    throw new Error('User parameter is required');
  }
  try {
    const userRef = usersCollection.doc(userParam.uid);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      const user = new User(
        userParam.email.trim(),
        userParam.displayName.trim(),
      );

      let timeStamp = firestore.FieldValue.serverTimestamp();
      await userRef.set({
        user,
        createdAt: timeStamp,
      });
      const albumsRef = userRef.collection('Albums');
      await addDoc(albumsRef, {});
    }
    return Enums.MESSAGE.SignUpSuccess;
  } catch (error) {
    throw error;
  }
};
const saveNewUserToFirestore = async (userCredential, user) => {
  if (!userCredential) {
    throw new Error('User parameter is required');
  }
  try {
    await updateProfile(userCredential.user, {
      displayName: user.Username,
    });

    const userRef = usersCollection.doc(userCredential.user.uid);
    let timeStamp = firestore.FieldValue.serverTimestamp();
    await usersCollection.doc(userCredential.user.uid).set({
      user,
      createdAt: timeStamp,
    });
    const albumsRef = userRef.collection('Albums');
    await addDoc(albumsRef, {});

    return Enums.MESSAGE.SignUpSuccess;
  } catch (error) {
    throw error;
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
