import * as crypto from 'crypto'
import { cryptingConstant } from '../common/constant/crypting.constant'

export function encrypt(str: string): string {
  try {
    const encryptAgent = crypto.createCipheriv(
      cryptingConstant.PASSWORD_CRYPTING_ALGORITHM,
      cryptingConstant.PASSWORD_CRYPTING_SECRET_KEY,
      cryptingConstant.PASSWORD_CRYPTING_IV,
    )
    return (
      encryptAgent.update(str, 'utf-8', 'base64') + encryptAgent.final('base64')
    )
  } catch (err: any) {
    throw new Error('Encrypting malfuntioned')
  }
}

export function verifyEncrypted(
  unencryptedString: string,
  encryptedString: string,
): boolean {
  try {
    return encrypt(unencryptedString) === encryptedString
  } catch (err: any) {
    throw new Error('Crypting malfuntioned')
  }
}
export function decrypt(encryptedStr: string): string {
  try {
    const decryptAgent = crypto.createDecipheriv(
      cryptingConstant.PASSWORD_CRYPTING_ALGORITHM,
      cryptingConstant.PASSWORD_CRYPTING_SECRET_KEY,
      cryptingConstant.PASSWORD_CRYPTING_IV,
    );
    return (
      decryptAgent.update(encryptedStr, 'base64', 'utf-8') + decryptAgent.final('utf-8')
    );
  } catch (err: any) {
    throw new Error('Decrypting malfunctioned');
  }
}
