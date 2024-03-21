'use client';
import React, { useState } from 'react';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
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



  const handleEncrypt = () => {
    if (!password) {
        setAlertMessage('Please enter a password.');
        setShowAlert(true);
        setShowSuccess(false);
        return;
    }

    const encrypted = AES.encrypt(encryptInput, password).toString();
    setOutput(encrypted);
    setShowAlert(false);
    setSuccessMessage('Your data has been encrypted.');
    setShowSuccess(true);
    setEncryptButtonText('Encrypted'); // Update button text
    setTimeout(() => setEncryptButtonText('Encrypt'), 2000); // Reset after 2 seconds
};

const handleDecrypt = () => {
    if (!password) {
        setAlertMessage('Please enter a password.');
        setShowAlert(true);
        setShowSuccess(false);
        return;
    }
    try {
        const bytes = AES.decrypt(decryptInput, password);
        const decryptedText = bytes.toString(Utf8);
        setOutput(decryptedText);
        setShowAlert(false);
        setSuccessMessage('Your data has been decrypted.');
        setShowSuccess(true);
        setDecryptButtonText('Decrypted'); // Update button text
        setTimeout(() => setDecryptButtonText('Decrypt'), 2000); // Reset after 2 seconds
    } catch (e) {
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