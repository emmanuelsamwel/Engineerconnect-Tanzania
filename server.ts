import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Shared Gemini client utility
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API Route: AI Diagnosis and Specialist Recommendation
  app.post("/api/diagnose", async (req, res) => {
    try {
      const { description, categoryContext, language } = req.body;
      if (!description) {
        return res.status(400).json({ error: "Problem description is required" });
      }

      if (!ai) {
        console.warn("GEMINI_API_KEY not found or invalid. Using fallback diagnostics.");
        const fallback = getFallbackDiagnosis(description, categoryContext, language);
        return res.json(fallback);
      }

      const prompt = `
You are the professional AI Technical Diagnosis Assistant for "EngineerConnect Tanzania", a leading platform connecting Tanzanian clients with certified, high-quality engineers.
The client has provided the following description of their engineering or technical problem:
Description: "${description}"
Category context (if any): "${categoryContext || 'General / Unknown'}"
Preferred user interface language (default is English or Swahili depending on request): "${language || 'English'}"

Based on this, perform a helpful technical diagnosis and provide professional, safe, and actionable recommendations.
You must respond in a strictly structured JSON format conforming to the following structure:
{
  "diagnosis": "Detailed engineering diagnosis of what the issue could be (written in elegant, easy-to-understand English or English + Swahili). Must be highly technical but accessible.",
  "recommendedCategory": "Select exactly one of these: 'Electrical', 'Mechanical', 'Civil', 'Biomedical', 'Solar', 'Automation', 'HVAC' or 'Maintenance'",
  "urgency": "Select exactly one of: 'Low', 'Medium', 'High', 'Emergency'",
  "estimatedCostRange": "Estimated cost range in Tanzanian Shillings (TZS), e.g. '80,000 - 150,000 TZS' (Must feel realistic for standard Tanzanian labor and material rates)",
  "safetySteps": [
    "Immediate safety step 1 (cautionary action user should take first to protect life/property)",
    "Immediate safety step 2",
    "..."
  ],
  "technicalReasoning": "Professional explanation of engineering standards, why this issue occurs, and what diagnostic tool a technician will likely use.",
  "swahiliTranslation": {
    "diagnosis": "Swahili translation of the diagnosis",
    "urgency": "Swahili urgency ('Ndogo', 'Kati', 'Kuu', 'Dharura' corresponding to the English value)",
    "safetySteps": [
      "Hatua ya 1 ya usalama (Swahili translation of first safety step)",
      "Hatua ya 2 ya usalama",
      "..."
    ]
  }
}

Generate clear, helpful, and technically accurate responses tailored to Tanzania. Ensure output is JSON valid.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              diagnosis: { type: Type.STRING },
              recommendedCategory: { type: Type.STRING },
              urgency: { type: Type.STRING },
              estimatedCostRange: { type: Type.STRING },
              safetySteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              technicalReasoning: { type: Type.STRING },
              swahiliTranslation: {
                type: Type.OBJECT,
                properties: {
                  diagnosis: { type: Type.STRING },
                  urgency: { type: Type.STRING },
                  safetySteps: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["diagnosis", "urgency", "safetySteps"]
              }
            },
            required: ["diagnosis", "recommendedCategory", "urgency", "estimatedCostRange", "safetySteps", "technicalReasoning", "swahiliTranslation"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from Gemini API");
      }

      const diagnosisResult = JSON.parse(responseText);
      res.json(diagnosisResult);

    } catch (error: any) {
      console.error("AI Diagnosis Error:", error);
      res.status(500).json({
        error: "Failed to perform AI diagnosis: " + error.message,
        fallback: getFallbackDiagnosis(req.body.description, req.body.categoryContext, req.body.language)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

function getFallbackDiagnosis(description: string, category: string, lang: string) {
  const d = description.toLowerCase();
  let rec = "Electrical";
  let urgency = "Medium";
  let cost = "50,000 - 120,000 TZS";
  let diagnosis = "Suspected issue in wiring, circuit breakers, or system load calculation.";
  let safety = ["Switch off the main power/breaker immediately.", "Avoid touching exposed copper or cables.", "Wait for a verified technician to inspect."];
  let swMain = "Suala linalodhaniwa kuwa katika nyaya, swichi za kukata umeme, au hesabu ya mzigo.";
  let swUrgency = "Kati";
  let swSafety = ["Zima swichi kuu ya umeme mara moja.", "Epuka kugusa nyaya za shaba wazi au kebo.", "Subiri fundi aliyethibitishwa akague."];

  if (d.includes("water") || d.includes("pipe") || d.includes("leak") || d.includes("plumb") || d.includes("roof") || d.includes("concrete") || d.includes("crack")) {
    rec = "Civil";
    urgency = d.includes("burst") || d.includes("flood") ? "High" : "Low";
    cost = "80,000 - 250,000 TZS";
    diagnosis = "Potential pipe failure or micro-fissure in the structural frame causing fluid intrusion.";
    safety = ["Shut off the master water valve or main stop-cock.", "De-energize electrical devices in the pooled vicinity.", "Place absorbing materials or sandbags to control flow."];
    swMain = "Hitilafu kwenye muundo wa bomba au nyufa ndogo katika mfumo uliosababisha unyevu kupenya.";
    swUrgency = urgency === "High" ? "Kuu" : "Ndogo";
    swSafety = ["Funga vali kuu ya usambazaji maji.", "Zima umeme wa vifaa vilivyo karibu na maji.", "Weka nyenzo za kufyonza maji ili kudhibiti mtiririko."];
  } else if (d.includes("motor") || d.includes("pump") || d.includes("engine") || d.includes("fan") || d.includes("noise") || d.includes("sound")) {
    rec = "Mechanical";
    urgency = d.includes("smoke") || d.includes("fire") ? "Emergency" : "Medium";
    cost = "60,000 - 180,000 TZS";
    diagnosis = "Mechanical friction buildup, worn rotor bearings, or loss of mechanical lubrication.";
    safety = ["Cut off power feed to the rotary mechanical asset.", "Do not try to spin the shaft manually under load.", "Let the equipment assembly cool down completely before touch."];
    swMain = "Mkusanyiko wa msuguano wa kimekanika, fani za rota zilizochakaa, au upungufu wa mafuta.";
    swUrgency = urgency === "Emergency" ? "Dharura" : "Kati";
    swSafety = ["Zima ugavi wa nishati kwenye kifaa chenye mzunguko.", "Usijaribu kuzungusha ekseli kwa mikono ikiwa chini ya mzigo.", "Acha mashine ipoe kabisa kabla ya kuigusa."];
  } else if (d.includes("solar") || d.includes("battery") || d.includes("panel") || d.includes("sun") || d.includes("inverter")) {
    rec = "Solar";
    urgency = "Medium";
    cost = "100,000 - 300,000 TZS";
    diagnosis = "Solar PV array disconnection, faulty charge controller settings, or lithium bank cell imbalance.";
    safety = ["De-isolate the solar power switch safety box.", "Ensure the solar inverter is completely dust-free.", "Avoid opening sealed battery enclosure packages."];
    swMain = "Kukatika kwa unganisho la paneli za jua, mipangilio mibovu ya kidhibiti nishati, au kukosa usawa kwenye seli za betri.";
    swUrgency = "Kati";
    swSafety = ["Tenganisha swichi ya usalama ya mfumo wa jua.", "Hakikisha inverter ya jua haina vumbi kabisa.", "Epuka kufungua masanduku yaliyofungwa ya betri."];
  } else if (d.includes("ac") || d.includes("air") || d.includes("cool") || d.includes("fridge") || d.includes("refrigerator") || d.includes("heat") || d.includes("hvac")) {
    rec = "HVAC";
    urgency = "Medium";
    cost = "75,000 - 150,000 TZS";
    diagnosis = "Compressor thermal cut-out triggered or evaporator cooling coils frost accumulation.";
    safety = ["Switch off the air cooling master switch.", "Shut logical vents and close room doors.", "Clean visible air filtration screens if accessible safety-wise."];
    swMain = "Kifaa cha kukata joto cha compressor kimechochewa au mkusanyiko wa barafu kwenye koili.";
    swUrgency = "Kati";
    swSafety = ["Zima swichi kuu ya mfumo wa kupoza hewa.", "Funga milango na madirisha ili kudhibiti halijoto.", "Safisha chujio cha hewa cha nje iwapo ni salama kufanya hivyo."];
  } else if (d.includes("sensor") || d.includes("plc") || d.includes("control") || d.includes("automate") || d.includes("screen") || d.includes("program")) {
    rec = "Automation";
    urgency = "Medium";
    cost = "120,000 - 400,000 TZS";
    diagnosis = "Logic loop communication interruption, master PLC status fault instruction register, or field sensor feedback drop.";
    safety = ["Place local control loops into manual safe mode default state.", "Do not execute master warm reboot without saving configurations.", "Log visible alarm codes from the local HMI display screen."];
    swMain = "Kukatika kwa mawasiliano ya mfumo au hitilafu ya maelekezo ya kidhibiti cha PLC.";
    swUrgency = "Kati";
    swSafety = ["Weka mifumo ya kudhibiti kwenye mwongozo salama.", "Usifanye upya upya upakiaji wa mfumo bila kuhifadhi kumbukumbu.", "Andika nambari zozote za kengele zinazoonekana kwenye skrini."];
  } else if (d.includes("medical") || d.includes("hospital") || d.includes("patient") || d.includes("ecg") || d.includes("scan") || d.includes("clinical") || d.includes("xray")) {
    rec = "Biomedical";
    urgency = "High";
    cost = "150,000 - 500,000 TZS";
    diagnosis = "Biomedical transducer drift, calibration loss, or leakage current beyond electrical safety standards.";
    safety = ["Immediately power off the affected medical device to ensure clinic safety.", "Label 'DO NOT USE' and detach it fully from patient proximity.", "Do not compromise system internal components without electrostatic protection."];
    swMain = "Kuharibika kwa usawa wa kifaa cha matibabu au uvujaji wa mkondo wa umeme.",
    swUrgency = "Kuu";
    swSafety = ["Zima kifaa cha matibabu kilichoathirika mara moja.", "Weka lebo ya 'USITUMIE' na ukitenge kabisa na wagonjwa.", "Usifungue kifaa bila vifaa vya kuzuia umeme tuli."];
  }

  return {
    diagnosis,
    recommendedCategory: rec,
    urgency,
    estimatedCostRange: cost,
    safetySteps: safety,
    technicalReasoning: "Standardized engineering pattern returned by local diagnosis engine.",
    swahiliTranslation: {
      diagnosis: swMain,
      urgency: swUrgency,
      safetySteps: swSafety
    }
  };
}

startServer();
