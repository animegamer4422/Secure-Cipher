'use client';
import React, { useState } from 'react';
import Header from './components/Header.client';
import PasswordInput from './components/PasswordInput.client';
import Output from './components/Output.client';

interface AlertDialogProps {
  message: string;
  onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ message, onClose }) => {
  return (
    <div role="alert" className="alert alert-warning" onClick={onClose}>
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      <span>{message}</span>
    </div>
  );
};

const SuccessDialog: React.FC<AlertDialogProps> = ({ message, onClose }) => {
  return (
    <div role="alert" className="alert alert-success" onClick={onClose}>
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{message}</span>
    </div>
  );
};

const encode = (text: string): Uint8Array => {
  return new TextEncoder().encode(text);
};

const decode = (buffer: ArrayBuffer): string => {
  return new TextDecoder().decode(buffer);
};

const getPasswordKey = async (password: string): Promise<CryptoKey> => {
  const encoded = encode(password);
  return window.crypto.subtle.importKey(
    'raw',
    encoded,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
};

const deriveKey = async (passwordKey: CryptoKey, salt: Uint8Array, keyUsage: KeyUsage[]): Promise<CryptoKey> => {
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    keyUsage
  );
};

const uint8ArrayToBase64 = (bytes: Uint8Array): string => {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const Home: React.FC = () => {
  const [encryptInput, setEncryptInput] = useState('');
  const [decryptInput, setDecryptInput] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [encryptButtonText, setEncryptButtonText] = useState('Encrypt');
  const [decryptButtonText, setDecryptButtonText] = useState('Decrypt');
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const handleEncrypt = async () => {
    if (!password) {
      setAlertMessage('Please enter a password.');
      setShowAlert(true);
      setShowSuccess(false);
      return;
    }
    try {
      const passwordKey = await getPasswordKey(password);
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(passwordKey, salt, ['encrypt']);

      const encoded = encode(encryptInput);
      const encrypted = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoded
      );

      const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);

      const base64CipherText = uint8ArrayToBase64(combined);
      setOutput(base64CipherText);
      setShowAlert(false);
      setSuccessMessage('Your data has been encrypted.');
      setShowSuccess(true);
      setEncryptButtonText('Encrypted');
      setTimeout(() => setEncryptButtonText('Encrypt'), 2000);
    } catch (error) {
      setAlertMessage('Encryption failed. Please try again.');
      setShowAlert(true);
      setShowSuccess(false);
    }
  };

  const handleDecrypt = async () => {
    if (!password) {
      setAlertMessage('Please enter a password.');
      setShowAlert(true);
      setShowSuccess(false);
      return;
    }

    try {
      const combined = Uint8Array.from(atob(decryptInput), c => c.charCodeAt(0));
      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const data = combined.slice(28);

      const passwordKey = await getPasswordKey(password);
      const key = await deriveKey(passwordKey, salt, ['decrypt']);

      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        key,
        data
      );

      const decryptedText = decode(decrypted);
      setOutput(decryptedText);
      setShowAlert(false);
      setSuccessMessage('Your data has been decrypted.');
      setShowSuccess(true);
      setDecryptButtonText('Decrypted');
      setTimeout(() => setDecryptButtonText('Decrypt'), 2000);
    } catch (error) {
      setAlertMessage('Failed to decrypt. Check your password and try again.');
      setShowAlert(true);
      setShowSuccess(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      {showAlert && <AlertDialog message={alertMessage} onClose={() => setShowAlert(false)} />}
      {showSuccess && <SuccessDialog message={successMessage} onClose={() => setShowSuccess(false)} />}
      <PasswordInput
        password={password}
        onPasswordChange={(e) => setPassword(e.target.value)}
      />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <div className="card bg-base-300 rounded-box place-items-center p-4 mb-4">
              <div className="grid place-items-center w-full">
                <span className="text-lg font-bold">Encrypt Text</span>
                <textarea
                  className="textarea textarea-bordered border-4 w-11/12 md:w-full h-auto min-h-[8rem] mt-2" 
                  placeholder="Enter text to encrypt"
                  value={encryptInput}
                  onChange={(e) => setEncryptInput(e.target.value)}
                ></textarea>
                <button className="btn mt-4 btn-outline" onClick={handleEncrypt}>{encryptButtonText}</button>
              </div>
            </div>
          </div>
          <div className="divider md:divider-horizontal">OR</div>
          <div className="flex-1">
            <div className="card bg-base-300 rounded-box place-items-center p-4 mb-4">
              <div className="grid place-items-center w-full">
                <span className="text-lg font-bold">Decrypt Text</span>
                <textarea 
                  className="textarea textarea-bordered border-4 w-11/12 md:w-full h-auto min-h-[8rem] mt-2" 
                  placeholder="Enter text to decrypt"
                  value={decryptInput}
                  onChange={(e) => setDecryptInput(e.target.value)}
                ></textarea>
                <button className="btn mt-4 btn-outline" onClick={handleDecrypt}>{decryptButtonText}</button>
              </div>
            </div>
          </div>
        </div>
        <Output 
          output={output} 
          copyButtonText={copyButtonText}
          onCopySuccess={() => {
            setSuccessMessage('Copied to clipboard!');
            setShowSuccess(true);
            setCopyButtonText('Copied');
            setTimeout(() => setCopyButtonText('Copy'), 2000);
          }} 
        />
      </div>
    </div>
  );
};

export default Home;
