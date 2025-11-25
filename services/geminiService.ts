import { GoogleGenAI, Type } from "@google/genai";
import { ExtractedStory } from "../types";

const extractStories = async (fullText: string): Promise<ExtractedStory[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // We use gemini-2.5-flash for its speed and large context window, perfect for analyzing long texts.
    const modelId = "gemini-2.5-flash";

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Analyze the following text and extract all distinct stories, anecdotes, or narrative segments.
      
      For each story you identify:
      1. Extract the complete text (beginning, middle, and end).
      2. Create a descriptive, engaging title.
      3. Provide a one-sentence summary.
      
      Text to analyze:
      ${fullText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "A descriptive title for the extracted story",
              },
              content: {
                type: Type.STRING,
                description: "The full text content of the extracted story",
              },
              summary: {
                type: Type.STRING,
                description: "A one-sentence summary of the story",
              },
            },
            required: ["title", "content", "summary"],
          },
        },
      },
    });

    if (response.text) {
      const parsedData = JSON.parse(response.text) as ExtractedStory[];
      // Add client-side IDs for React keys
      return parsedData.map((story, index) => ({
        ...story,
        id: `story-${Date.now()}-${index}`,
      }));
    }

    throw new Error("No data returned from AI service");
  } catch (error) {
    console.error("Error extracting stories:", error);
    throw error;
  }
};

export { extractStories };