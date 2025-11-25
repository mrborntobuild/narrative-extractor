import React, { useState } from 'react';
import Button from './Button';

interface StoryInputProps {
  onProcess: (text: string) => void;
  isLoading: boolean;
  initialText: string;
}

const StoryInput: React.FC<StoryInputProps> = ({ onProcess, isLoading, initialText }) => {
  const [text, setText] = useState(initialText);

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onProcess(text);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Narrative Extractor</h1>
          <p className="text-slate-600">
            Paste your long narrative below. AI will intelligently separate distinct stories, 
            give them titles, and summarize them for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute top-0 right-0 p-2 text-xs text-slate-400 pointer-events-none bg-white rounded-bl-lg border-l border-b border-slate-100">
              {wordCount} words | {charCount} chars
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Once upon a time, in a land far away... (Paste your full text here)"
              className="w-full min-h-[400px] p-6 text-lg text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-y placeholder-slate-400 outline-none leading-relaxed"
              spellCheck={false}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-center">
            <Button 
              type="submit" 
              isLoading={isLoading} 
              disabled={text.trim().length === 0}
              className="w-full md:w-auto px-12 py-4 text-lg shadow-indigo-200"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              }
            >
              Process Story
            </Button>
          </div>
        </form>

        {isLoading && (
          <div className="mt-8 text-center animate-pulse">
            <p className="text-indigo-600 font-medium">Analyzing narrative structure...</p>
            <p className="text-slate-400 text-sm mt-1">This might take a moment depending on the length of your story.</p>
          </div>
        )}
      </div>
      
      {/* Feature hints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center text-slate-500">
        <div className="p-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">Smart Extraction</h3>
          <p className="text-sm">Automatically identifies where one story ends and another begins.</p>
        </div>
        <div className="p-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">Title Generation</h3>
          <p className="text-sm">Creates engaging titles and summaries for each extracted segment.</p>
        </div>
        <div className="p-4">
           <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
           </div>
          <h3 className="font-semibold text-slate-700 mb-1">Structured Output</h3>
          <p className="text-sm">Get clean JSON format results ready for publishing or archiving.</p>
        </div>
      </div>
    </div>
  );
};

export default StoryInput;