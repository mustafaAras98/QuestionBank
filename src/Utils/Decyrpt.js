import {ENCYRPT_KEY, IV_KEY} from '@env';
import Aes from 'react-native-aes-crypto';
import {Enums} from '../Constants/Enums';

async function Decrypt(encryptedText) {
  try {
    const encrpytKey = ENCYRPT_KEY;
    const ivKey = IV_KEY;
    const decrypted = await Aes.decrypt(
      encryptedText,
      encrpytKey,
      ivKey,
      'aes-256-cbc',
    );
    return decrypted;
  } catch (error) {
    throw new Error(Enums.MESSAGE.Errors.DecryptionError);
  }
}

export default Decrypt;
