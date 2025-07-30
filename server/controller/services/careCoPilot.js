import OpenAI from 'openai';
import { asyncHandler } from '../../utils/asyncHandler.js';

// Safety disclaimer that must be included in every response
const SAFETY_DISCLAIMER = `
🚨 **IMPORTANT SAFETY WARNING** 🚨

⚠️ **This is only for learning and education. It is NOT a replacement for doctor's advice.**

**VERY IMPORTANT RULES:**
• ❌ Never give medicine to children under 2 years without asking a doctor
• ✅ Always ask your doctor how much medicine to give
• 🏥 If your child gets worse, go to hospital immediately
• 👨‍⚕️ This computer cannot replace a real doctor
• 📞 When in doubt, call your doctor or go to hospital

**Remember**: Your child's safety is most important. When unsure, always ask a doctor!
`;



// Comprehensive healthcare knowledge base prompt
const HEALTHCARE_KNOWLEDGE_PROMPT = `
You are a comprehensive healthcare assistant providing educational information about over-the-counter (OTC) medications and home remedies for people of all ages (0-90 years).

**Your role is to:**
1. Provide educational information about common OTC medications and natural remedies
2. Suggest appropriate medications based on symptoms, age, and weight
3. Include dosage guidelines (but always recommend consulting a doctor)
4. List active ingredients to look for in medications
5. Provide important safety considerations and contraindications
6. Suggest when to seek immediate medical attention
7. ALWAYS include the safety disclaimer

**Guidelines:**
- Consider age-appropriate medications and dosages (infants, children, adults, elderly)
- Always emphasize consulting a healthcare provider
- Include both conventional medicines and natural/home remedies
- Mention potential side effects and drug interactions
- Consider underlying health conditions and allergies
- Provide clear, easy-to-understand instructions
- Use common brand names and generic names
- Include emergency warning signs

**Response format:**
1. Symptom Analysis (What this means)
2. Suggested OTC Medications and Natural Remedies
3. Dosage Guidelines (age/weight-based)
4. Important Safety Considerations
5. When to Seek Medical Attention
6. Safety Disclaimer (mandatory)

**Important:** Provide specific, actionable advice that is easy to follow. Use simple language and clear instructions.
`;

const careCoPilot = asyncHandler(async (req, res) => {
  try {
    const { childAge, childWeight, symptoms, additionalNotes } = req.body;

    // Validate required fields
    if (!childAge || !symptoms) {
      return res.status(400).json({
        success: false,
        message: "Child age and symptoms are required fields"
      });
    }

    // Validate age (must be between 0-90 years)
    const age = parseInt(childAge);
    if (age < 0 || age > 90) {
      return res.status(400).json({
        success: false,
        message: "Age must be between 0 and 90 years"
      });
    }

    // Validate weight if provided
    let weight = null;
    if (childWeight) {
      weight = parseFloat(childWeight);
      if (weight <= 0 || weight > 200) {
        return res.status(400).json({
          success: false,
          message: "Child weight must be between 0 and 200 kg"
        });
      }
    }

         // Initialize OpenAI client
     const openai = new OpenAI({
       apiKey: process.env.OPENAI_API_KEY,
     });

     // Construct the prompt for OpenAI
     const userPrompt = `
Patient Information:
- Age: ${age} years
- Weight: ${weight ? `${weight} kg` : 'Not provided'}
- Symptoms: ${symptoms}
- Additional Notes: ${additionalNotes || 'None'}

Please provide comprehensive educational guidance for appropriate OTC medications and home remedies based on this information. Consider the patient's age group and provide age-appropriate recommendations.
`;

     // Call OpenAI API
     const completion = await openai.chat.completions.create({
       model: "gpt-3.5-turbo",
       messages: [
         {
           role: "system",
           content: HEALTHCARE_KNOWLEDGE_PROMPT
         },
         {
           role: "user",
           content: userPrompt
         }
       ],
       max_tokens: 1500,
       temperature: 0.2, // Lower temperature for more consistent, conservative responses
     });

     const aiResponse = completion.choices[0].message.content;

     // Ensure safety disclaimer is included
     const responseWithDisclaimer = aiResponse.includes(SAFETY_DISCLAIMER) 
       ? aiResponse 
       : `${aiResponse}\n\n${SAFETY_DISCLAIMER}`;

     // Log the interaction for monitoring (without sensitive data)
     console.log(`Care Co-Pilot consultation for patient age ${age}, symptoms: ${symptoms}`);

     res.status(200).json({
       success: true,
       data: {
         patientAge: age,
         patientWeight: weight,
         symptoms: symptoms,
         guidance: responseWithDisclaimer,
         timestamp: new Date().toISOString(),
         disclaimer: "This response includes educational information only and should not replace professional medical advice.",
         mode: "ai"
       }
     });

  } catch (error) {
    console.error('Care Co-Pilot Error:', error);
    
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request. Please try again or consult a healthcare provider.",
      error: error.message
    });
  }
});

// Health check endpoint for the AI service
const healthCheck = asyncHandler(async (req, res) => {
  try {
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Test OpenAI API connection
    const testCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Test" }],
      max_tokens: 5,
    });

    res.status(200).json({
      success: true,
      message: "Care Co-Pilot AI service is operational",
      timestamp: new Date().toISOString(),
      mode: "ai"
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Care Co-Pilot AI service is currently unavailable",
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

export { careCoPilot, healthCheck }; 