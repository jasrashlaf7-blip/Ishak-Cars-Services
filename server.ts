import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialization of Gemini to prevent startup crashes if GEMINI_API_KEY is not defined yet
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set. Please add it via Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Live Chat API for Technical AI Advisor
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();

    // Map the user request with a high-quality system instruction for WorldSkills Algeria 2026
    const systemInstruction = 
      "You are the official Arabic/French/English multilingual AI Virtual Guide for 'WorldSkills Algeria 2026' (المسابقة الوطنية للمهارات المهنية), " +
      "organized by the Ministry of Vocational Training and Education (وزارة التكوين والتعليم المهنيين). " +
      "Your goal is to guide Algerian trainees, graduates, and enthusiasts regarding the 50+ technical skills categorized into 6 sectors " +
      "(ICT, Manufacturing, Construction, Creative Arts, Social/Personal Services, Hospitality/Culinary). " +
      "Advise them on: the 4 competition stages (Registration & validation, Local Wilayatal phase across 58 wilayas, Regional hubs like Constantine, Ghardaia, Algiers, Tlemcen, Bechar, and National Finals in Oran), " +
      "or offer them custom practice mock-tasks / testing questions based on world-class vocational standards. " +
      "Always maintain a encouraging, highly professional, national development-oriented attitude. " +
      "Respond in a well-formatted bilingual manner (e.g. introducing terms in Arabic and explaining details in French or vice versa, or answering in the language requested by the candidate).";

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // In @google/genai, chat.sendMessage expects the message string or Part
    const response = await chatInstance.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ 
      error: error.message || "An internal error occurred",
      isMissingKey: !process.env.GEMINI_API_KEY
    });
  }
});

// 2. Mock AI Realtime Update Commentary Generator
app.post("/api/generate-updates", async (req, res) => {
  try {
    const { skillName, stage, wilaya } = req.body;
    
    // Provide a dynamic simulated live broadcast description
    const ai = getGeminiClient();
    const prompt = `Write a short, engaging, 2-3 sentence 'live sports-commentary-style' news update (breaking broadcast) in French or English (with some Arabic expressions like "Masha'Allah") about the current ongoing stage "${stage}" of the WorldSkills Algeria 2026 competition. The update should feature the specialization "${skillName || 'Mobile Applications Development'}" and highlight a trainee representing Wilaya "${wilaya || 'Oran'}". Focus on technical excellence, laser focus under intense time limits, and WorldSkills international standards. Keep it brief, professional, and exciting!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.85,
      }
    });

    res.json({ commentary: response.text });
  } catch (error: any) {
    console.error("Error in /api/generate-updates:", error);
    // Return a beautiful fallback commentary if the API key is not yet set
    const fallbacks = [
      `[LIVE COMMENTARY] Intense atmospheres at the Regional Hub! The candidate representing Wilaya of Oran demonstrates absolute mastery over micro-controllers and circuits in Mechatronics, working under strict WorldSkills timelines!`,
      `[LIVE COMMENTARY] Sensational performance in Mobile Applications Development where trainees are racing to build clean API endpoints. A stunning level of vocational talent displayed for Algeria 2026!`,
      `[LIVE COMMENTARY] From the dry plastering systems to pâtisserie art: Trainees from all 58 Wilayas are exhibiting master-craft accuracy. The criteria are tough, but the determination to select the national elite is higher!`
    ];
    res.json({ 
      commentary: fallbacks[Math.floor(Math.random() * fallbacks.length)],
      note: "Using offline local mock, GEMINI_API_KEY not configured."
    });
  }
});

// Serve assets based on environment
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WorldSkills Algeria 2026 Server running on port ${PORT}`);
  });
}

setupServer();
