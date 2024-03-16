'use client';
import React, { useState } from 'react';
import Header from './components/Header.client';
import PasswordInput from './components/PasswordInput.client';
import Output from './components/Output.client';

const Home: React.FC = () => {
  const [encryptInput, setEncryptInput] = useState('');
  const [decryptInput, setDecryptInput] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');

  // Simple encryption/decryption placeholder functions
  const encryptText = (text: string) => {
    return `Encrypted: ${text} with ${password}`;
  };

  const decryptText = (text: string) => {
    return `Decrypted: ${text} with ${password}`;
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
                <button className="btn mt-4" onClick={() => setOutput(encryptText(encryptInput))}>Encrypt</button>
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
                <button className="btn mt-4" onClick={() => setOutput(decryptText(decryptInput))}>Decrypt</button>
              </div>
            </div>
          </div>
        </div>

        {/* Password Section */}

        <PasswordInput password={''} onPasswordChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          } } />


        {/* Output Section */}
        <div className="card bg-base-200 mt-4">
        <Output output={''} />
        </div>
      </div>
    </div>
  );
};

export default Home;
