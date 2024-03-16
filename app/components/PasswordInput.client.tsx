import React from 'react';

interface PasswordInputProps {
  password: string;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ password, onPasswordChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-center md:w-full mt-4">
      <div className="card bg-base-300 rounded-box place-items-center p-4 w-full">
        <div className="grid place-items-center w-full">
          <span className="text-lg font-bold">Password for Encryption/Decryption</span>
          <input
            type="password" 
            className="input input-bordered border-4 w-11/12 md:w-5/6 h-auto mt-2"
            placeholder="Enter password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
