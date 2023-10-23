const Crypt = require('crypto');


export const pgDbConfig = {
    host:'localhost',
    database:'spandan',
    user:'postgres',
    password:'Nithish@2000',
    port:5432,
    max:40,//max no of client in the pool
    idleTimeoutMillis: 30000,
}

export const JWT_SECRET_KEY = require('crypto').randomBytes(32).toString('hex');

const keyEncryptDecrypt =  '7efcfc483b004fabadd3d951f44decf7';
const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt(text:any) {
    let iv = Crypt.randomBytes(IV_LENGTH);
    let cipher = Crypt.createCipheriv('aes-256-cbc', Buffer.from(keyEncryptDecrypt), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
   }
   
export function decrypt(text:any) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(":"), 'hex');
    let decipher = Crypt.createDecipheriv('aes-256-cbc', Buffer.from(keyEncryptDecrypt), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}