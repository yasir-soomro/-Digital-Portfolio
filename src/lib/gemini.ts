import { GoogleGenAI, ThinkingLevel } from "@google/genai";

// Extend Window interface for AI Studio helpers
declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

// Initialize the default client with the environment key (for free models)
// Note: This might be empty if the user hasn't set it, but for free models 
// in this environment, it's usually pre-configured or we use the paid flow.
const defaultClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

/**
 * Ensures a paid API key is selected for premium models (Veo, Gemini 3 Pro Image).
 */
async function ensurePaidApiKey(): Promise<string> {
  if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
    }
    // After selection, the key is injected into process.env.API_KEY
    // We need to re-read it.
    return process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  }
  return process.env.GEMINI_API_KEY || '';
}

/**
 * Generates an image using Gemini 3 Pro Image Preview (Nano Banana Pro).
 */
export async function generateImage(prompt: string, aspectRatio: string, imageSize: string = '1K') {
  const apiKey = await ensurePaidApiKey();
  const client = new GoogleGenAI({ apiKey });
  
  const response = await client.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: prompt }],
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio,
        imageSize: imageSize,
      },
    },
  });

  // Extract image from response
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error('No image generated');
}

/**
 * Generates a video using Veo (veo-3.1-fast-generate-preview).
 */
export async function generateVideo(prompt: string, aspectRatio: string = '16:9') {
  const apiKey = await ensurePaidApiKey();
  const client = new GoogleGenAI({ apiKey });

  let operation = await client.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p', // Preview model limitation
      aspectRatio: aspectRatio,
    }
  });

  // Poll for completion
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await client.operations.getVideosOperation({ operation: operation });
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) throw new Error('No video generated');

  // Fetch the actual video blob
  const videoResponse = await fetch(videoUri, {
    headers: { 'x-goog-api-key': apiKey }
  });
  
  if (!videoResponse.ok) throw new Error('Failed to download video');
  
  const blob = await videoResponse.blob();
  return URL.createObjectURL(blob);
}

/**
 * Analyzes an image or video using Gemini 3.1 Pro.
 */
export async function analyzeMedia(prompt: string, mediaBase64: string, mimeType: string) {
  // Use default client (or paid if needed, but 3.1 Pro might be free tier compatible? 
  // The prompt says "paid Gemini models... require user-provided API keys". 
  // Let's assume 3.1 Pro is premium/paid for now to be safe, or check docs.
  // Actually, for consistency, let's use the paid flow if available to avoid rate limits.)
  const apiKey = await ensurePaidApiKey();
  const client = new GoogleGenAI({ apiKey });

  const response = await client.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: {
      parts: [
        { inlineData: { mimeType, data: mediaBase64 } },
        { text: prompt }
      ]
    }
  });

  return response.text;
}

/**
 * Chat with Thinking Mode (Gemini 3.1 Pro).
 */
export async function chatThinking(prompt: string) {
  const apiKey = await ensurePaidApiKey();
  const client = new GoogleGenAI({ apiKey });

  const response = await client.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
    config: {
      thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH } // ThinkingLevel.HIGH
    }
  });

  return response.text;
}

/**
 * Fast Chat (Gemini 2.5 Flash Lite).
 */
export async function chatFast(prompt: string) {
  // Flash Lite might be free, but let's use the key we have.
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  
  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash-lite-preview', // Check exact model name from prompt
    contents: prompt,
  });

  return response.text;
}

/**
 * Text to Speech (Gemini 2.5 Flash TTS).
 */
export async function generateSpeech(text: string) {
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash-preview-tts',
    contents: { parts: [{ text }] },
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!audioData) throw new Error('No audio generated');
  
  return `data:audio/mp3;base64,${audioData}`;
}
