// pages/index.tsx

import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
        {/* Encryption Section */}
        <div className="flex-1">
          <div className="card bg-base-300 rounded-box place-items-center p-4 mb-4">
            <span className="text-lg font-bold">Encrypt</span>
            <textarea className="textarea textarea-bordered w-11/12 h-32 mt-2" placeholder="Enter text to encrypt"></textarea>
          </div>
        </div>

        {/* Divider */}
        <div className="divider md:divider-horizontal">OR</div>

        {/* Decryption Section */}
        <div className="flex-1">
          <div className="card bg-base-300 rounded-box place-items-center p-4 mb-4">
            <span className="text-lg font-bold">Decrypt</span>
            <textarea className="textarea textarea-bordered w-11/12 h-32 mt-2" placeholder="Enter text to decrypt"></textarea>
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div className="card bg-base-200 mt-4">
        <div className="card-body">
          <h2 className="card-title">Output</h2>
          <input type="text" placeholder="Output will be shown here" className="input input-bordered w-full" readOnly />
        </div>
      </div>
    </div>
  );
};

export default Home;
