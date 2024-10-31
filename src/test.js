import aes from 'js-crypto-aes';
import { Buffer } from 'buffer';

const generateRandomString = function (length, randomString = "") {
    randomString += Math.random().toString(20).substring(2, length);
    if (randomString.length > length) return randomString.slice(0, length);
    return generateRandomString(length, randomString);
};

var encrypted;
var encryptedUint8;

const msg = Buffer.from(generateRandomString(20), 'utf8');
const key = Buffer.from(generateRandomString(16), 'utf8');
const iv = Buffer.from(generateRandomString(12), 'utf8');

aes.encrypt(msg, key, { name: 'AES-GCM', iv:iv, tagLength: 16 }).then((res) => {
    encrypted = Array.from(res);
    encryptedUint8 = res;
    aes.decrypt(encryptedUint8, key, { name: 'AES-GCM', iv: iv, tagLength: 16 }).then((res) => {
        console.log(Buffer.from(res.buffer).toString());
        console.log(res);
    });
});

