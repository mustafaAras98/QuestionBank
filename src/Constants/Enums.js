export const Enums = {
  BUTTON_TYPES: {Primary: 'primary', Secondary: 'secondary', Delete: 'delete'},
  TEXTINPUT_TYPES: {Primary: 'primary', Secondary: 'secondary'},
  STATUS: {
    Success: 'Success',
    Failure: 'Failure',
  },
  Lists: {
    OpenImageList: ['Album', 'Image'],
  },
  OpenImageList: {Album: 'Album', Image: 'Image'},
  MESSAGE: {
    LoginSuccess: 'Login successful',
    SignUpSuccess: 'Sign-up successful',
    ForgetPasswordSucces: 'Forget Password successful',
    ForgottenPasswordMailSent: 'A mail has been sent to your email address.',
    UserDeleteSuccess: 'User deleted successfully.',
    UserUpdateSuccess: 'User updated successfully.',
    Errors: {
      ImageIdMissing: 'Image Id information is missing!',
      SignInCancelled: 'User cancelled google sign in process',
      NoImageError: 'There are no image on this album',
      NoFavoriteImageError: 'There are no favorite image on this album',
      UpdateTitleError: 'Firestore can not update title of desired albums',
      DeleteAlbumFirestoreError: 'Firestore can not delete desired albums',
      DeleteImageFirestoreError: 'Firestore can not delete desired images',
      DeleteAlbumStorageError: 'Firebase storage can not delete desired albums',
      ImageCannotConvertToBlob: 'Image can not convert to blob',
      DeleteAlbumGenericError: 'Album can not be deleted',
      DeleteImageGenericError: 'Image can not be deleted',
      CreateNewAlbumGenericError: 'New album can not be created',
      CreateNewImageGenericError: 'New Image can not be created',
      UserIdMissing: 'User ID information is missing!',
      ImageNameMissing: 'Image Name information is missing!',
      AlbumIdMissing: 'Album ID information is missing!',
      TitleMissing: 'Title information is missing!',
      ImagePathMissing: 'Image Path information is missing!',
      UserAlreadySignedUp: 'The user has already signed up.',
      InvalidCredential: 'Auth Credentials is incorrect.',
      MissingPassword: 'Password is missing.',
      MissingEmail: 'Email is missing.',
      NetworkRequestFailed: 'Please check your network connection.',
      UnknownError: 'An unknown error occurred.',
      EmailAlreadyExists: 'The email address is already in use.',
      OperationNotAllowed: 'Operation not allowed.',
      WeakPassword: 'The password is too weak.',
      InvalidEmail: 'Invalid email address.',
      TooManyRequest: 'Too Many Attempt.',
      EmailDontExists:
        'The provided email address does not match any existing user accounts.',
      IDTokenError: 'No ID token found',
      FetchAlbumError:
        'Something went wrong while accessing your album. Please try again in a few moments.',
      FetchAlbumsError:
        'Something went wrong while accessing your albums. Please try again in a few moments.',
      FetchImageNoImageError: 'There are no available image with that token.',
      FetchImageNoAlbumError: 'There are no available album with that token.',
      FetchImageError:
        'Something went wrong while accessing your image. Please try again in a few moments.',
      FetchImagesError:
        'Something went wrong while accessing your images. Please try again in a few moments.',
      ImageFavoriteChangeError:
        'Something went wrong while changing favoritism of photo. Please try again in a few moments.',
      FetchFavoriteImagesError:
        'Something went wrong while accessing your favorite images. Please try again in a few moments.',
      AlbumsDontExists: 'User album does not exist',
      DecryptionError: 'Decryption Error',
      EncryptionError: 'Encryption Error',
    },
    Validations: {
      EmailValidErrors: 'Email must be valid.',
      UsernameNotFound: 'Please enter a username.',
      UsernameMustBeString: 'Username must be a valid text.',
      UsernameCharacterMessage: (minLength, maxLength) =>
        `Username must be between ${minLength} and ${maxLength} characters long.`,
      UsernameValidCharacters:
        'Usernames can only use letters, numbers, underscores, and periods.',
      PasswordNotFound: 'Please enter a password',
      PasswordFormatMessage: 'Please enter a valid password format.',
      PasswordCharacterMessage: (minLength, maxLength) =>
        `Password must be between ${minLength} and ${maxLength} characters long.`,
      PasswordAtLeastOneUppercase:
        'Password must contain at least one uppercase letter.',
      PasswordAtLeastOneLowercase:
        'Password must contain at least one lowercase letter.',
      PasswordAtLeastOneNumber: 'Password must contain at least one number.',
    },
  },
  FLATLISTROW: {
    First: 'First',
    Last: 'Last',
    SecondToLast: 'SecondToLast',
    Other: 'Other',
  },
};
