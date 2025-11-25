import React from 'react';
import { ExtractedStory } from '../types';
import StoryCard from './StoryCard';
import Button from './Button';

interface StoryListProps {
  stories: ExtractedStory[];
  onBack: () => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto w-full pb-12">
      <div className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-md py-4 mb-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <Button 
                onClick={onBack} 
                variant="secondary"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>}
              >
                Back to Input
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Extracted Stories</h2>
                <p className="text-sm text-slate-500">Found {stories.length} distinct segments</p>
              </div>
           </div>
           
           <div className="hidden sm:block">
              <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                AI Processed
              </span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {stories.map((story) => (
          <div key={story.id} className="h-full">
            <StoryCard story={story} />
          </div>
        ))}
      </div>

      {stories.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <p>No stories found. Please try again with different text.</p>
        </div>
      )}
    </div>
  );
};

export default StoryList;