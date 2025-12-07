import React from 'react';

interface ApiKeySelectorProps {
  onKeySelected: () => void;
}

const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onKeySelected }) => {
  const handleSelectKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      onKeySelected();
    } else {
      alert("API Key selection utility is not available.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-2xl text-center">
        <div className="flex justify-center">
          <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 016-6h4a6 6 0 016 6z"></path></svg>
        </div>
        <h1 className="text-2xl font-bold text-white">API Key Required</h1>
        <p className="text-gray-400">
          The <code className="bg-gray-700 text-blue-300 px-1 py-0.5 rounded">gemini-3-pro-image-preview</code> model requires a paid Google Cloud project. Please select an API key to continue.
        </p>
        <p className="text-sm text-gray-500">
          For more information, see the{' '}
          <a
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            billing documentation
          </a>.
        </p>
        <button
          onClick={handleSelectKey}
          className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
          Select API Key
        </button>
      </div>
    </div>
  );
};

export default ApiKeySelector;
