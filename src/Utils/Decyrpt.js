import {ENCYRPT_KEY, IV_KEY} from '@env';
import Aes from 'react-native-aes-crypto';
import {Enums} from '../Constants/Enums';

async function Decrypt(encryptedText) {
  try {
    const decrypted = await Aes.decrypt(
      encryptedText,
      ENCYRPT_KEY,
      IV_KEY,
      'aes-256-cbc',
    );
    return decrypted;
  } catch (error) {
    throw new Error(Enums.MESSAGE.Errors.DecryptionError);
  }
}

export default Decrypt;
