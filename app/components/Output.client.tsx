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
    <div className="card bg-base-200 mt-4">
      <div className="card-body">
        <h2 className="card-title">Output</h2>
        <textarea
          placeholder="Output will be shown here"
          className="textarea textarea-bordered border-4 w-11/12 md:w-full min-h-[10rem] md:min-h-[8rem]"
          readOnly
          value={output}
        ></textarea>
        <button className="btn mt-4"
          onClick={copyToClipboard}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default Output;
