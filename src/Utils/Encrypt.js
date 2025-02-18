import {ENCYRPT_KEY, IV_KEY} from '@env';
import Aes from 'react-native-aes-crypto';
import {Enums} from '../Constants/Enums';

async function Encrypt(data) {
  try {
    const encrypted = await Aes.encrypt(
      data,
      ENCYRPT_KEY,
      IV_KEY,
      'aes-256-cbc',
    );
    return encrypted;
  } catch (error) {
    throw new Error(Enums.MESSAGE.Errors.EncryptionError);
  }
}

export default Encrypt;
