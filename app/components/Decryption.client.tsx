import React from 'react';

interface DecryptionProps {
  decryptInput: string;
  onDecryptInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDecrypt: () => void;
}

const Decryption: React.FC<DecryptionProps> = ({ decryptInput, onDecryptInputChange, onDecrypt }) => {
  return (
    <div className="card bg-base-300 rounded-box place-items-center p-4 mb-4">
      <div className="grid place-items-center w-full">
        <span className="text-lg font-bold">Decrypt Text</span>
        <textarea 
          className="textarea textarea-bordered border-4 w-11/12 md:w-full h-auto min-h-[8rem] mt-2" 
          placeholder="Enter text to decrypt"
          value={decryptInput}
          onChange={onDecryptInputChange}
        ></textarea>
        <button className="btn mt-4" onClick={onDecrypt}>Decrypt</button>
      </div>
    </div>
  );
};

export default Decryption;
