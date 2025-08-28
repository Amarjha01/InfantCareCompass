import { GoogleGenerativeAI } from '@google/generative-ai';
import { asyncHandler } from '../../utils/asyncHandler.js';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Safety disclaimer that must be included in every response
const SAFETY_DISCLAIMER = `
🚨 **IMPORTANT SAFETY WARNING** 🚨

⚠️ **This is for educational purposes only. It is NOT a replacement for professional medical advice.**

**CRITICAL SAFETY RULES:**
• ❌ Never attempt to treat serious injuries or medical emergencies at home
• ✅ Always call emergency services (911/112) for life-threatening situations
• 🏥 Seek immediate medical attention for severe symptoms
• 👨‍⚕️ This AI cannot diagnose or provide medical treatment
• 📞 When in doubt, contact a healthcare professional immediately

**Remember**: Your safety and the safety of others is paramount. When unsure, always seek professional medical help!
`;

// First Aid focused prompt for Gemini 2.5 Flash
const FIRST_AID_PROMPT = `
You are an expert first aid assistant specializing in providing immediate first aid guidance and emergency response advice. Your role is to:

**Primary Responsibilities:**
1. Assess the severity of the situation described
2. Provide step-by-step first aid instructions
3. Advise whether immediate medical attention is needed
4. Offer preventive measures and safety tips
5. Guide users on when to call emergency services

**Response Structure:**
1. **Situation Assessment** - Brief analysis of the described condition/symptom
2. **First Aid Steps** - Clear, numbered steps for immediate response
3. **Medical Attention Required?** - Clear YES/NO with explanation
4. **Emergency Actions** - What to do if symptoms worsen
5. **Prevention Tips** - How to avoid similar situations in the future

**Guidelines:**
- Use simple, clear language that anyone can understand
- Prioritize safety and immediate action
- Always err on the side of caution
- Include specific signs that indicate emergency medical care is needed
- Provide age-appropriate advice when relevant
- Focus on immediate stabilization and safety
- Include both conventional first aid and modern best practices

**Important:** Be direct, actionable, and safety-focused. If the situation sounds serious, strongly recommend seeking immediate medical attention.
`;

const firstAidChatbot = asyncHandler(async (req, res) => {
  try {
    const { prompt, patientAge, patientWeight, additionalContext } = req.body;

    // Validate required fields
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "A prompt describing the situation or symptoms is required"
      });
    }

    // Validate age if provided
    let age = null;
    if (patientAge) {
      age = parseInt(patientAge);
      if (age < 0 || age > 120) {
        return res.status(400).json({
          success: false,
          message: "Patient age must be between 0 and 120 years"
        });
      }
    }

    // Validate weight if provided
    let weight = null;
    if (patientWeight) {
      weight = parseFloat(patientWeight);
      if (weight <= 0 || weight > 300) {
        return res.status(400).json({
          success: false,
          message: "Patient weight must be between 0 and 300 kg"
        });
      }
    }

    // Initialize Gemini model - Using Gemini 2.5 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Construct the user prompt
    const userPrompt = `
Patient Information:
- Age: ${age ? `${age} years` : 'Not specified'}
- Weight: ${weight ? `${weight} kg` : 'Not specified'}
- Situation/Symptoms: ${prompt}
- Additional Context: ${additionalContext || 'None'}

Please provide comprehensive first aid guidance for this situation. Assess the severity and provide clear, actionable steps.
`;

    // Generate response using Gemini 2.5 Flash
    const result = await model.generateContent([
      FIRST_AID_PROMPT,
      userPrompt
    ]);

    const response = await result.response;
    const aiResponse = response.text();

    // Ensure safety disclaimer is included
    const responseWithDisclaimer = aiResponse.includes(SAFETY_DISCLAIMER) 
      ? aiResponse 
      : `${aiResponse}\n\n${SAFETY_DISCLAIMER}`;

    // Log the interaction for monitoring (without sensitive data)
    console.log(`First Aid Chatbot consultation - Age: ${age || 'Not specified'}, Prompt: ${prompt.substring(0, 100)}...`);

    res.status(200).json({
      success: true,
      data: {
        prompt: prompt,
        patientAge: age,
        patientWeight: weight,
        additionalContext: additionalContext,
        guidance: responseWithDisclaimer,
        timestamp: new Date().toISOString(),
        disclaimer: "This response provides first aid guidance for educational purposes only and should not replace professional medical advice.",
        model: "gemini-2.0-flash-exp",
        requiresMedicalAttention: responseWithDisclaimer.toLowerCase().includes('emergency') || 
                                  responseWithDisclaimer.toLowerCase().includes('immediate medical') ||
                                  responseWithDisclaimer.toLowerCase().includes('call 911') ||
                                  responseWithDisclaimer.toLowerCase().includes('call emergency')
      }
    });

  } catch (error) {
    console.error('First Aid Chatbot Error:', error);
    
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request. Please try again or seek immediate medical attention if needed.",
      error: error.message
    });
  }
});

// Health check endpoint for the First Aid Chatbot service
const healthCheck = asyncHandler(async (req, res) => {
  try {
    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    // Test Gemini API connection
    const result = await model.generateContent("Test connection");
    const response = await result.response;

    res.status(200).json({
      success: true,
      message: "First Aid Chatbot AI service is operational",
      timestamp: new Date().toISOString(),
      model: "gemini-2.0-flash-exp"
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "First Aid Chatbot AI service is currently unavailable",
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

export { firstAidChatbot, healthCheck };
