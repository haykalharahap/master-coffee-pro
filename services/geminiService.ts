import { GoogleGenAI } from "@google/genai";

export class CoffeeSommelierService {
  private chat: any = null;

  private getChatInstance() {
    if (!this.chat) {
      // Fix: Initialize with direct process.env.API_KEY usage as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      this.chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'You are the Master Coffee Sommelier. You are an expert in bean origins, roasting techniques, and brewing methods. Your goal is to help customers choose the perfect drink from our menu. Be sophisticated, warm, and highly knowledgeable. Keep responses concise but evocative.',
        },
      });
    }
    return this.chat;
  }

  async sendMessage(message: string) {
    try {
      const chat = this.getChatInstance();
      const response = await chat.sendMessage({ message });
      // Fix: Access .text as a property, not a method, as per SDK documentation
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I apologize, my senses are currently clouded. Could you repeat that?";
    }
  }

  async sendMessageStream(message: string, onChunk: (chunk: string) => void) {
    try {
      const chat = this.getChatInstance();
      const response = await chat.sendMessageStream({ message });
      for await (const chunk of response) {
        // Fix: Properly access the .text property from the streaming chunk
        onChunk(chunk.text || "");
      }
    } catch (error) {
      console.error("Gemini Streaming Error:", error);
      onChunk("Error communicating with the Coffee Sommelier.");
    }
  }
}

export const sommelierService = new CoffeeSommelierService();
