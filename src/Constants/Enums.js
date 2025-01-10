export const Enums = {
  BUTTON_TYPES: {Primary: 'primary', Secondary: 'secondary'},
  TEXTINPUT_TYPES: {Primary: 'primary', Secondary: 'secondary'},
  STATUS: {
    Success: 'Success',
    Failure: 'Failure',
  },
  MESSAGE: {
    LoginSuccess: 'Login successful',
    SignUpSuccess: 'Sign-up successful',
    ForgetPasswordSucces: 'Forget Password successful',
    ForgottenPasswordMailSent: 'A mail has been sent to your email address.',
    UserDeleteSuccess: 'User deleted successfully.',
    UserUpdateSuccess: 'User updated successfully.',
    Errors: {
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
};
