const CryptoJS = require('crypto-js')
const key = CryptoJS.enc.Utf8.parse('moon@123')
const iv = CryptoJS.enc.Utf8.parse('96565612')

export const enCode = (str) => {
  const plaintext = CryptoJS.enc.Utf8.parse(str)
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv })
  return encrypted.toString()
}
export const deCode = (str) => {
  const bytes = CryptoJS.AES.decrypt(str, key, { iv })
  return bytes.toString(CryptoJS.enc.Utf8)
}
