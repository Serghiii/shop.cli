import CryptoJS from 'crypto-js'

const SECRET_KEY = String(process.env.CRIPTO)

export function encryptString(text: string): string {
	return CryptoJS.AES.encrypt(text, SECRET_KEY).toString()
}

export function decryptString(encryptedText: string): string {
	try {
		const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY)
		return bytes.toString(CryptoJS.enc.Utf8)
	} catch (error) {
		console.error('Error during decryption:', error)
		throw new Error('It was not possible to decipher the data')
	}
}
