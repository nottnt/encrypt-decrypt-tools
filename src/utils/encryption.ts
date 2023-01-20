import CryptoJS from 'crypto-js'
import AES from 'crypto-js/aes'
import Base64 from 'crypto-js/enc-base64'
import Hex from 'crypto-js/enc-hex'
import PBKDF2 from 'crypto-js/pbkdf2'
import * as R from 'ramda'

export interface IEncryption {
  input: string,
  code: string,
  interationCount: number,
  keySize: number,
  passphrase: string,
  iv: string,
  salt: string
}

export const encrypt = ({
  input = '',
  code = '',
  interationCount = 0,
  keySize = 0,
  passphrase = '',
  iv = '',
  salt = ''
}: IEncryption): string => {
  try {
    const saltHex = Hex.parse(salt)
    const key = PBKDF2(R.concat(passphrase, code), saltHex, { keySize: keySize, iterations: interationCount })
    const encrypted = AES.encrypt(input, key, { iv: Hex.parse(iv) })

    return Base64.stringify(encrypted.ciphertext)
  } catch (error) {
    return `Error encryption: ${error}`
  }
}

export const decrypt = ({
  input = '',
  code = '',
  interationCount = 0,
  keySize = 0,
  passphrase = '',
  iv = '',
  salt = ''
}: IEncryption): string => {
  try {
    const saltHex = Hex.parse(salt)
    const key = PBKDF2(R.concat(passphrase, code), saltHex, { keySize: keySize, iterations: interationCount })
    const cipherParams = CryptoJS.lib.CipherParams.create(
      {
        ciphertext: CryptoJS.enc.Base64.parse(input)
      }
    )
    const decrypted = AES.decrypt(cipherParams, key, { iv: Hex.parse(iv) })

    return CryptoJS.enc.Utf8.stringify(decrypted)
  } catch (error) {
    return `Error decryption: ${error}`
  }
}
