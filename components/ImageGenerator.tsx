import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';
import Spinner from './Spinner';
import SparklesIcon from './icons/SparklesIcon';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for the image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (e) {
      const err = e as Error;
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            <SparklesIcon />
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Gemini Image Generator
            </h1>
          </div>
          <p className="text-gray-400 mt-2">Create stunning images with Gemini</p>
        </header>

        <main className="bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700">
          <div className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                Image Description
              </label>
              <textarea
                id="prompt"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-500"
                placeholder="e.g., A futuristic cityscape at sunset, with flying cars and neon lights"
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleGenerateClick}
              disabled={isLoading || !prompt.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              {isLoading ? <><Spinner /> Generating...</> : 'Generate Image'}
            </button>

            {error && <div className="text-red-400 bg-red-900/50 border border-red-700 p-3 rounded-lg text-center">{error}</div>}
          </div>
        </main>
        
        <section className="mt-8">
          <div className="aspect-square w-full bg-gray-800/50 rounded-2xl border border-gray-700 flex items-center justify-center overflow-hidden">
            {isLoading && (
              <div className="text-center">
                <Spinner />
                <p className="mt-2 text-gray-400">Conjuring your masterpiece...</p>
              </div>
            )}
            {!isLoading && generatedImage && (
              <img src={generatedImage} alt={prompt} className="object-contain w-full h-full" />
            )}
            {!isLoading && !generatedImage && (
              <div className="text-center text-gray-500 p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="mt-2">Your generated image will appear here.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImageGenerator;