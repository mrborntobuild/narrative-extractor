export interface ExtractedStory {
  title: string;
  content: string;
  summary: string;
  id?: string;
}

export interface ProcessingStats {
  originalWordCount: number;
  extractedCount: number;
  processingTimeMs: number;
}

export type AppView = 'input' | 'results';