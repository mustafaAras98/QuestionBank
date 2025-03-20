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
import albumService from './Album.Service';

import {WEB_CLIENT_ID} from '@env';
import {albumDocsByUserId, usersCollection} from '../Constants/Collections';
import {Enums} from '../Constants/Enums';
import User from '../Models/User';

import ValidateEmailSchema from '../Utils/Validation/ValidateEmailSchema';
import ValidateUsernameSchema from '../Utils/Validation/ValidateUsernameSchema';
import ValidatePasswordSchema from '../Utils/Validation/ValidatePasswordSchema';
import handleFirebaseAuthError from '../Utils/FirebaseErrorHandler';

const auth = getAuth();

const createUserWithEmail = async (userParam, t) => {
  const user = new User(userParam.Email, userParam.Username);
  const password = userParam.Password.trim();

  let emailValidate = ValidateEmailSchema(user.Email, t);
  let usernameValidate = ValidateUsernameSchema(user.Username, 8, 18, t);
  let passwordValidate = ValidatePasswordSchema(password, 8, 18, t);
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
    return validateMessage.trim();
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.Email,
      password,
    );
    await saveNewUserToFirestore(userCredential, user);

    return Enums.STATUS.Success;
  } catch (error) {
    return handleFirebaseAuthError(error, t);
  }
};
const signInWithEmail = async (userParam, t) => {
  let email = userParam.Email.trim();
  let password = userParam.Password.trim();

  let emailValidate = ValidateEmailSchema(email, t);
  let passwordValidate = ValidatePasswordSchema(password, 8, 18, t);

  let validateMessage = '';

  if (emailValidate !== Enums.STATUS.Success) {
    validateMessage += `${emailValidate} \n`;
  }
  if (passwordValidate !== Enums.STATUS.Success) {
    validateMessage += `${passwordValidate}`;
  }
  if (validateMessage !== '') {
    return validateMessage.trim();
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return Enums.STATUS.Success;
  } catch (error) {
    return handleFirebaseAuthError(error, t);
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
const deleteUser = async t => {
  try {
    const userId = auth.currentUser.uid;
    if (userId) {
      const albumCollection = albumDocsByUserId(userId);
      const albumDocs = await albumCollection.get();
      albumDocs.forEach(async albumSnapshot => {
        if (!albumSnapshot) {
          return;
        }
        await albumService.removeAlbum(albumSnapshot.data().Uid, userId, t);
      });

      await usersCollection.doc(userId).delete();
      await auth.currentUser.delete();
      await auth.signOut();
    }
  } catch (error) {
    return error.code;
  }
};
const forgetPassword = async (email, t) => {
  let emailTrimmed = email.trim();
  let emailValidate = ValidateEmailSchema(emailTrimmed, t);
  if (emailValidate !== Enums.STATUS.Success) {
    return emailValidate;
  }
  try {
    const q = query(usersCollection, where('user.Email', '==', emailTrimmed));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return t('authenticationErrors.EmailDontExists');
    }
    await sendPasswordResetEmail(auth, emailTrimmed);
    return Enums.STATUS.Success;
  } catch (error) {
    return handleFirebaseAuthError(error, t);
  }
};
const signInWithGoogle = async t => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const signInResult = await GoogleSignin.signIn();

    if (!signInResult || (!signInResult.data && !signInResult.idToken)) {
      return t('authenticationErrors.SignInCancelled');
    }

    let idToken = signInResult.data.idToken;
    if (!idToken) {
      idToken = signInResult.idToken;
    }
    if (!idToken) {
      return t('authenticationErrors.IDTokenError');
    }
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(
      signInResult.data.idToken,
    );
    auth
      .signInWithCredential(googleCredential)
      .then(() => saveGoogleUserToFirestore(auth.currentUser));

    return Enums.STATUS.Success;
  } catch (error) {
    return handleFirebaseAuthError(error, t);
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
    return Enums.STATUS.Success;
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

    return Enums.STATUS.Success;
  } catch (error) {
    throw error;
  }
};

const authService = {
  createUserWithEmail,
  signInWithEmail,
  signInWithGoogle,
  logout,
  deleteUser,
  forgetPassword,
};

export default authService;
