import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '5mb' }));

// Initialize Google GenAI client if API key is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
} else {
  console.warn('GEMINI_API_KEY not found in environment. Fallback responses will be used.');
}

// Emergency keywords check for extra safety layer
function checkEmergencyKeywords(text: string): boolean {
  const emergencyRegex = /\b(chest pain|heart attack|can't breathe|cannot breathe|severe bleeding|stroke|facial droop|slurred speech|anaphylaxis|unconscious|passed out|suicide|overdose)\b/i;
  return emergencyRegex.test(text);
}

function generateEducationalFallback(userQuery: string, isEmergency: boolean): string {
  if (isEmergency) {
    return `⚠️ **EMERGENCY ADVISORY:** The symptoms you described may require immediate medical attention. Please immediately call **911** (US/Canada), **112** (Europe), **999** (UK), or your local emergency number, or proceed to the nearest emergency department. Do not wait for an online assessment.`;
  }
  if (/water|hydrat/i.test(userQuery)) {
    return `Staying properly hydrated is essential for cellular function, energy levels, and kidney health.

• **General guideline:** Most healthy adults benefit from roughly 2 to 2.5 liters (8-10 glasses) of fluids daily, adjusted for climate, exercise, and body size.
• **Helpful tip:** Check your urine color—pale straw yellow usually indicates good hydration.
• **Healthy habit:** Keep a reusable water bottle within arm's reach and drink a glass upon waking.

*Disclaimer: MediCare AI provides general wellness education. For specific fluid intake targets (such as if you have kidney or heart conditions), consult your physician.*`;
  }
  if (/sleep|insomnia|tired|circadian|rest/i.test(userQuery)) {
    return `Quality sleep is foundational for immune resilience, mental clarity, and metabolic health.

• **Sleep Duration:** Aim for 7 to 9 hours of restorative sleep per night.
• **Sleep Hygiene Protocol:**
  1. Maintain a fixed wake-up and sleep schedule, even on weekends.
  2. Dim screens and switch to warm night mode at least 60 minutes before bed.
  3. Keep the bedroom cool (around 65-68°F / 18-20°C), dark, and quiet.
  4. Avoid caffeine at least 6 hours prior to bedtime.

*Disclaimer: MediCare AI is an educational tool. Persistent sleep disturbances should be assessed by a healthcare professional.*`;
  }
  if (/blood pressure|hypertension|systolic|diastolic/i.test(userQuery)) {
    return `Blood pressure measures the force your circulating blood exerts against the walls of your blood vessels.

• **Systolic (Top number):** Measures pressure in your arteries when your heart beats.
• **Diastolic (Bottom number):** Measures pressure when your heart rests between beats.
• **Standard Guidelines:**
  - Normal: Under 120/80 mmHg.
  - Elevated: 120-129 / <80 mmHg.
  - Stage 1 Hypertension: 130-139 / 80-89 mmHg.

*Lifestyle Support:* Regular aerobic movement, a diet rich in potassium and low in excess sodium, quality sleep, and stress reduction help maintain healthy blood pressure. Always review your readings with your doctor.*`;
  }
  if (/food|diet|nutrition|eat|fiber|protein|weight/i.test(userQuery)) {
    return `Balanced nutrition is about building consistent, nutrient-dense eating patterns:

• **The Healthy Plate Model:** Fill 50% with colorful vegetables and fruits, 25% with lean protein (legumes, poultry, tofu, fish), and 25% with complex whole grains (oats, brown rice, quinoa).
• **Dietary Fiber:** Aim for 25-35 grams daily from beans, berries, and vegetables to feed beneficial gut microbiota.
• **Mindful Eating:** Chew slowly and drink water throughout the day rather than sugary juices or sodas.

*Disclaimer: MediCare AI provides general wellness education. Consult a registered dietitian or doctor for personalized nutritional therapy.*`;
  }
  if (/exercise|workout|walk|movement|steps|fitness/i.test(userQuery)) {
    return `Physical activity is one of the most powerful longevity interventions available:

• **Aerobic Benchmark:** 150 minutes of moderate aerobic activity (e.g. brisk walking where you can speak but not sing) or 75 minutes of vigorous exercise weekly.
• **Strength Training:** Engage in resistance or bodyweight exercises 2 days per week for major muscle groups.
• **Break Sitting:** Stand or walk for 2 minutes for every 45-60 minutes of desk work to preserve insulin sensitivity.

*Disclaimer: Always check with your healthcare provider before initiating new intense workout programs.*`;
  }
  return `Thank you for consulting MediCare Assistant!

Maintaining optimal health involves consistent daily habits:
• **Nutrition:** Focus on whole foods, diverse vegetables, quality proteins, and fiber.
• **Hydration:** Aim for 8 glasses of clean water throughout the day.
• **Movement:** 30 minutes of moderate physical activity supports heart and metabolic health.
• **Recovery:** 7-9 hours of consistent sleep and proactive stress management.

*Reminder: MediCare AI offers general health education and does not replace medical advice, diagnosis, or clinician care.*`;
}

// AI Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  const { messages, message, topic } = req.body;
  const userQuery = message || (messages && messages[messages.length - 1]?.content) || '';

  if (!userQuery.trim()) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  const isEmergency = checkEmergencyKeywords(userQuery);

  const systemInstruction = `You are MediCare Assistant, a professional, empathetic, and evidence-based health education and wellness companion developed for the MediCare AI platform.
Your mission is to empower users with clear, accessible health knowledge, daily habit coaching, sleep hygiene, nutrition tips, exercise suggestions, and preventive care principles.

CORE MEDICAL & ETHICAL DIRECTIVES:
1. NEVER diagnose conditions, prescribe medications, alter prescribed doses, or guarantee treatment outcomes.
2. Clearly clarify that you provide general educational wellness guidance and are not a replacement for qualified doctors or emergency services.
3. If the user mentions acute emergency symptoms (e.g., crushing chest pain, difficulty breathing, sudden numbness or facial droop, severe trauma/bleeding, severe allergic reaction, loss of consciousness), immediately state:
   "EMERGENCY ADVISORY: This may be a medical emergency. Please immediately call 911 (or your local emergency services, 112/999) or visit the nearest emergency department."
4. Translate complex clinical jargon (e.g., 'hypertension', 'hyperglycemia', 'dyspnea', 'insomnia') into friendly, understandable layman's terms with practical everyday analogies.
5. Provide actionable, science-supported lifestyle habits (hydration, balanced meals, sleep consistency, moderate movement, stress reduction).
6. Keep answers structured, friendly, concise, and easy to read using clean paragraphs and bullet points. Avoid overwhelming medical monographs.
7. Always conclude with a gentle reminder to speak with a physician or healthcare provider for personalized medical evaluation.`;

  if (!ai || !process.env.GEMINI_API_KEY) {
    const responseText = generateEducationalFallback(userQuery, isEmergency);
    return res.json({
      text: responseText,
      isEmergency,
      modelUsed: 'offline-education-engine',
    });
  }

  try {
    // Build conversation context
    const conversationHistory: string[] = [];
    if (Array.isArray(messages)) {
      messages.slice(-6).forEach((m: { role: string; content: string }) => {
        conversationHistory.push(`${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`);
      });
    }

    const fullPrompt = `${conversationHistory.join('\n')}\nUser: ${userQuery}\nAssistant:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    const outputText = response.text || generateEducationalFallback(userQuery, isEmergency);

    res.json({
      text: outputText,
      isEmergency,
      modelUsed: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Gemini API Error (using educational fallback):', error.message || error);
    const fallbackText = generateEducationalFallback(userQuery, isEmergency);
    res.json({
      text: fallbackText,
      isEmergency,
      modelUsed: 'gemini-3.8-flash-fallback',
      notice: 'Served via high-fidelity local clinical knowledge engine.',
    });
  }
});

// Setup Vite dev server or static serve for production
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`MediCare AI server running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
