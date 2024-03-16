import React from 'react';

interface CryptoBoxProps {
  encryptInput: string;
  decryptInput: string;
  onEncryptInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDecryptInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEncrypt: () => void;
  onDecrypt: () => void;
}

const CryptoBox: React.FC<CryptoBoxProps> = ({
  encryptInput,
  decryptInput,
  onEncryptInputChange,
  onDecryptInputChange,
  onEncrypt,
  onDecrypt
}) => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      {/* Encryption Section */}
      <div className="flex-1 mb-4 md:mb-0">
        <div className="card bg-base-300 rounded-box place-items-center p-4">
          <div className="grid place-items-center w-full">
            <span className="text-lg font-bold">Encrypt Text</span>
            <textarea 
              className="textarea textarea-bordered border-4 w-full h-auto min-h-[8rem] mt-2" 
              placeholder="Enter text to encrypt"
              value={encryptInput}
              onChange={onEncryptInputChange}
            ></textarea>
            <button className="btn mt-4" onClick={onEncrypt}>Encrypt</button>
          </div>
        </div>
      </div>

      {/* Divider for md and larger screens */}
      <div className="divider md:divider-vertical">OR</div>

      {/* Decryption Section */}
      <div className="flex-1 mb-4 md:mb-0">
        <div className="card bg-base-300 rounded-box place-items-center p-4">
          <div className="grid place-items-center w-full">
            <span className="text-lg font-bold">Decrypt Text</span>
            <textarea 
              className="textarea textarea-bordered border-4 w-full h-auto min-h-[8rem] mt-2" 
              placeholder="Enter text to decrypt"
              value={decryptInput}
              onChange={onDecryptInputChange}
            ></textarea>
            <button className="btn mt-4" onClick={onDecrypt}>Decrypt</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoBox;
