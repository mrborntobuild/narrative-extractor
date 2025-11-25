import React, { useState } from 'react';
import { ExtractedStory, AppView } from './types';
import StoryInput from './components/StoryInput';
import StoryList from './components/StoryList';
import { extractStories } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('input');
  const [inputText, setInputText] = useState<string>('');
  const [stories, setStories] = useState<ExtractedStory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setInputText(text); // Save input state

    try {
      const extracted = await extractStories(text);
      setStories(extracted);
      setView('results');
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing the text.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setView('input');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      {/* Decorative gradient header */}
      <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 fixed top-0 w-full z-50"></div>

      <main className="container mx-auto px-4 py-12 min-h-screen flex flex-col">
        
        {error && (
          <div className="max-w-4xl mx-auto w-full mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <div>
              <p className="font-bold">Processing Error</p>
              <p className="text-sm">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="ml-auto p-1 hover:bg-red-100 rounded">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        )}

        {view === 'input' ? (
          <StoryInput 
            onProcess={handleProcess} 
            isLoading={isLoading} 
            initialText={inputText} 
          />
        ) : (
          <StoryList 
            stories={stories} 
            onBack={handleBack} 
          />
        )}
      </main>
      
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Narrative Splitter AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;