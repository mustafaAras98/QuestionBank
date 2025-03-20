const handleFirebaseAuthError = (error, t) => {
  console.error('Firebase Auth Error:', error);

  switch (error.code) {
    case 'auth/email-already-in-use':
      return t('authenticationErrors.EmailAlreadyExists');
    case 'auth/invalid-email':
      return t('authenticationErrors.InvalidEmail');
    case 'auth/operation-not-allowed':
      return t('authenticationErrors.OperationNotAllowed');
    case 'auth/weak-password':
      return t('authenticationErrors.WeakPassword');
    case 'auth/network-request-failed':
      return t('authenticationErrors.NetworkRequestFailed');
    case 'auth/invalid-credential':
      return t('authenticationErrors.InvalidCredential');
    case 'auth/too-many-requests':
      return t('authenticationErrors.TooManyRequest');
    default:
      return t('commonErrors.UnknownError');
  }
};

export default handleFirebaseAuthError;
