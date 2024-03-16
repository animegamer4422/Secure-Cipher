import React from 'react';

interface EncryptionProps {
  encryptInput: string;
  onEncryptInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEncrypt: () => void;
}

const Encryption: React.FC<EncryptionProps> = ({ encryptInput, onEncryptInputChange, onEncrypt }) => {
  return (
    <div className="card bg-base-300 rounded-box place-items-center p-4 mb-4">
      <div className="grid place-items-center w-full">
        <span className="text-lg font-bold">Encrypt Text</span>
        <textarea 
          className="textarea textarea-bordered border-4 w-11/12 md:w-full h-auto min-h-[8rem] mt-2" 
          placeholder="Enter text to encrypt"
          value={encryptInput}
          onChange={onEncryptInputChange}
        ></textarea>
        <button className="btn mt-4" onClick={onEncrypt}>Encrypt</button>
      </div>
    </div>
  );
};

export default Encryption;
