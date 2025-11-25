import React, { useState } from 'react';
import Button from './Button';

interface ImageGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  summary: string;
}

const ImageGenerationModal: React.FC<ImageGenerationModalProps> = ({ isOpen, onClose, title, summary }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulation of API call
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            Create Illustration
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="p-6 space-y-5 overflow-y-auto">
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1.5">Image Prompt</label>
             <textarea 
               className="w-full p-3 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-28 leading-relaxed"
               defaultValue={`A digital illustration for a story titled "${title}". \n\nScene description: ${summary}`}
             />
             <p className="text-xs text-slate-400 mt-1.5 text-right">AI suggestion based on your story</p>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1.5">Art Style</label>
               <select className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                 <option>Digital Art</option>
                 <option>Watercolor</option>
                 <option>Oil Painting</option>
                 <option>Minimalist Vector</option>
                 <option>Cyberpunk</option>
                 <option>Pencil Sketch</option>
               </select>
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1.5">Aspect Ratio</label>
               <select className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                 <option>16:9 (Landscape)</option>
                 <option>1:1 (Square)</option>
                 <option>9:16 (Portrait)</option>
                 <option>4:3 (Classic)</option>
               </select>
             </div>
           </div>
        </div>

        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isGenerating}>Cancel</Button>
          <Button 
            onClick={handleGenerate} 
            isLoading={isGenerating}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>}
          >
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerationModal;