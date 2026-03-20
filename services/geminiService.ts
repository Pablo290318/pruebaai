
import { GoogleGenAI } from "@google/genai";

// Function to generate a response from Gemini for the NexusScroll assistant
export const getGeminiResponse = async (prompt: string, context: string) => {
  try {
    // Create the AI client instance directly using the process.env.API_KEY string as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Contexto del sitio: ${context}\n\nPregunta del usuario: ${prompt}`,
      config: {
        systemInstruction: "Eres un asistente experto en diseño web y tecnología para el sitio 'NexusScroll'. Responde de forma concisa, inspiradora y en español. Tu objetivo es explicar cómo las animaciones de scroll mejoran la experiencia de usuario.",
        temperature: 0.7,
      },
    });

    // Access the text property directly from the response object as it is a getter, not a method
    const responseText = response.text;
    if (!responseText) {
      throw new Error("Respuesta vacía del modelo");
    }

    return responseText;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // Handle the specific error message that indicates an issue with the API key project or selection
    if (error.message?.includes("Requested entity was not found")) {
      return "ERROR_KEY_REQUIRED";
    }
    
    return "Lo siento, parece que hay un problema de conexión con mi cerebro digital. Por favor, inténtalo de nuevo en unos momentos.";
  }
};
