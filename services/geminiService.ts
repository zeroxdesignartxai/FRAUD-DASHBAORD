
import { GoogleGenAI } from "@google/genai";

// Strictly follow Google GenAI SDK initialization guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeOsintData = async (query: string, data: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a professional OSINT risk assessment based on the following query and entity data. 
      Query: ${query}
      Data: ${JSON.stringify(data)}
      Provide a summary, risk score (0-100), and key findings. 
      Format the output in clean Markdown.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    // Correctly accessing the text property on GenerateContentResponse
    return response.text;
  } catch (error) {
    console.error("Gemini OSINT analysis failed:", error);
    return "Analysis failed. Please check API configuration.";
  }
};
