import React, { useState } from 'react';
import { ExtractedStory } from '../types';
import Button from './Button';
import ImageGenerationModal from './ImageGenerationModal';

interface StoryCardProps {
  story: ExtractedStory;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const [copied, setCopied] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const wordCount = story.content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${story.title}\n\n${story.content}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`${story.title}\n\n${story.content}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${story.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
        <div className="p-6 flex-grow">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800 leading-tight">{story.title}</h3>
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 whitespace-nowrap ml-2">
              {readingTime} min read
            </span>
          </div>
          
          <p className="text-sm text-slate-500 italic mb-4 border-l-4 border-indigo-200 pl-3">
            {story.summary}
          </p>

          <div className="prose prose-slate prose-sm max-w-none text-slate-700">
            <p className="whitespace-pre-wrap leading-relaxed">{story.content}</p>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-medium">
            {wordCount} words
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleCopy}
              className="p-2 text-slate-500 hover:text-indigo-600 transition-colors rounded-md hover:bg-indigo-50"
              title="Copy to clipboard"
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              )}
            </button>
            
            <button 
              onClick={handleDownload}
              className="p-2 text-slate-500 hover:text-indigo-600 transition-colors rounded-md hover:bg-indigo-50"
              title="Download text file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>

            <Button 
              variant="secondary" 
              onClick={() => setShowImageModal(true)}
              className="text-xs py-1.5 px-3 h-auto"
              title="Create a unique illustration for this story"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              Create Image
            </Button>
          </div>
        </div>
      </article>

      <ImageGenerationModal 
        isOpen={showImageModal} 
        onClose={() => setShowImageModal(false)} 
        title={story.title}
        summary={story.summary}
      />
    </>
  );
};

export default StoryCard;