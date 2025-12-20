import { GoogleGenAI } from "@google/genai";

export const generateImage = async (prompt: string): Promise<string> => {
  // The API key is injected by Vite's define config from the VITE_API_KEY environment variable
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData?.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data was returned by the AI. Try a different description.");
  } catch (error: any) {
    console.error("Error generating image:", error);
    
    // Handle specific API errors
    const errorMessage = error.message || "";
    if (errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
      throw new Error("You've exceeded the free request limit. Please try again in a few minutes or check your Google Cloud billing settings.");
    }
    
    throw new Error(error.message || "An unknown error occurred while generating the image.");
  }
};