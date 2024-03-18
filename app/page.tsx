'use client';
import React, { useState } from 'react';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import Header from './components/Header.client';
import PasswordInput from './components/PasswordInput.client';
import Output from './components/Output.client';

const Home: React.FC = () => {
  const [encryptInput, setEncryptInput] = useState('');
  const [decryptInput, setDecryptInput] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');

  const handleEncrypt = () => {
    if (!password) {
      alert('Please enter a password.');
      return;
    }
    const encrypted = AES.encrypt(encryptInput, password).toString();
    setOutput(encrypted);
  };

  const handleDecrypt = () => {
    if (!password) {
      alert('Please enter a password.');
      return;
    }
    try {
      const bytes = AES.decrypt(decryptInput, password);
      const decryptedText = bytes.toString(Utf8);
      setOutput(decryptedText);
    } catch (e) {
      alert('Failed to decrypt. Check your password and try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          
          {/* Encryption Section */}
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
                <button className="btn mt-4 btn-outline" onClick={handleEncrypt}>Encrypt</button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="divider md:divider-horizontal">OR</div>

          {/* Decryption Section */}
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
                <button className="btn mt-4 btn-outline" onClick={handleDecrypt}>Decrypt</button>
              </div>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <PasswordInput
          password={password}
          onPasswordChange={(e) => setPassword(e.target.value)}
        />

        {/* Output Section */}
        <Output output={output} />
      </div>
    </div>
  );
};

export default Home;
