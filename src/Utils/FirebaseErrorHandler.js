import {Enums} from '../Constants/Enums';

const handleFirebaseAuthError = error => {
  console.error('Firebase Auth Error:', error); // Log için

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
    case 'auth/invalid-credential':
      return Enums.MESSAGE.Errors.InvalidCredential;
    case 'auth/too-many-requests':
      return Enums.MESSAGE.Errors.TooManyRequest;
    default:
      return Enums.MESSAGE.Errors.UnknownError;
  }
};

export default handleFirebaseAuthError;
