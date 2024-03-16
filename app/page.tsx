'use client';
import React, { useState } from 'react';
import Header from './components/Header.client';

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
        <div className="flex flex-col md:flex-row md:justify-center md:w-full mt-4">
          <div className="card bg-base-300 rounded-box place-items-center p-4 w-full">
            <div className="grid place-items-center w-full">
              <span className="text-lg font-bold">Password for Encryption/Decryption</span>
              <input 
                type="password" 
                className="input input-bordered border-4 w-11/12 md:w-5/6 h-auto mt-2"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="card bg-base-200 mt-4">
          <div className="card-body">
            <h2 className="card-title">Output</h2>
            <textarea
              placeholder="Output will be shown here"
              className="textarea textarea-bordered border-4 w-11/12 md:w-full min-h-[10rem] md:min-h-[8rem]"
              readOnly
              value={output}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
