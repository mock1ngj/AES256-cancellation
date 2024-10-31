import aes from 'js-crypto-aes';
import { Buffer } from 'buffer';
import { useEffect, useRef, useState } from 'react';

const generateRandomString = function (length, randomString = "") {
    randomString += Math.random().toString(20).substring(2, length);
    if (randomString.length > length) return randomString.slice(0, length);
    return generateRandomString(length, randomString);
};

const msg = generateRandomString(20);
const key = Buffer.from(generateRandomString(16), 'utf8');
const iv = Buffer.from(generateRandomString(12), 'utf8');

const App = () => {
    const [encrypted, setEncrypted] = useState();
    const [decrypted, setDecrypted] = useState();
    const [valid, setValid] = useState();
    const inputRef = useRef();

    const check = () => {
        console.log(inputRef.current.value);
        const input = inputRef.current.value;
        input == decrypted ? setValid('Success') : setValid('Wrong! Try Again');
    }

    useEffect(() => {
        aes.encrypt(Buffer.from(msg, 'utf8'), key, { name: 'AES-GCM', iv, tagLength: 16 }).then((res) => {
            setEncrypted(Array.from(res));
            aes.decrypt(res, key, { name: 'AES-GCM', iv, tagLength: 16 }).then((res) => {
                setDecrypted(Buffer.from(res.buffer).toString());
            });
        });
    }, []);

    return (
        <>
            <div className='prompt-block'>
                Decrypt the encrypted Array below to cancel your subscription. (AES-GCM)
                <div>
                    Key length is 16 bytes
                </div>
                <div>
                    IV length is 12 bytes
                </div>
                <div className='array-block'>
                    [
                    {encrypted && encrypted.map((value, index) => (
                        <>
                            {index < encrypted.length - 1 && (<>{value}, </>)}
                            {index == encrypted.length - 1 && (<>{value}</>)}
                        </>
                    ))}
                    ]
                </div>
                <div>
                    <input className='decrypted-input' type="text" max={20} ref={inputRef}/>
                    <input className='decrypted-button' type="button" value="Cancel" onClick={check}/>
                </div>
                <div>{valid}</div>
            </div>
        </>
    )
}

export default App
