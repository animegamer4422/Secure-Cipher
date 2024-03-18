import React from 'react';

interface OutputProps {
  output: string;
}

const Output: React.FC<OutputProps> = ({ output }) => {
  const copyToClipboard = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(output);
      alert('Copied to clipboard!');
    } else {
      console.error('Clipboard access not available.');
    }
  };

  return (
    <div className="card bg-base-300 mt-4 rounded-box ">
      <div className="card-body">
        <h2 className="card-title">Output</h2>
        <textarea
          placeholder="Output will be shown here"
          className="textarea textarea-bordered border-4 w-11/12 md:w-full h-auto min-h-[8rem] mt-2"
          readOnly
          value={output}
        ></textarea>
        <div className="flex justify-center mt-4">
          <button className="btn btn-outline" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Output;
