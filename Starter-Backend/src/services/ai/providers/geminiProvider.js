const AIProvider = require("../aiProvider");
const { GoogleGenAI } = require("@google/genai");


// ========================================
// Gemini Configuration
// ========================================

const MODEL = "gemini-3.1-flash-lite";


// ========================================
// Initialize Gemini Client
// ========================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// ========================================
// Gemini Provider
// ========================================

class GeminiProvider extends AIProvider {


    // ========================================
    // Generate
    // ========================================

    async generate(input, options = {}) {
        const response = await ai.models.generateContent({
            model: MODEL,
            contents: input,
            config: {
                maxOutputTokens: options.maxOutputTokens,
                temperature: options.temperature
            }
        });
        return this.normalizeResponse(response);
    }


    // ========================================
    // Count Tokens
    // ========================================

    async countTokens(input) {
        const response = await ai.models.countTokens({
            model: MODEL,
            contents: input
        });
        return response.totalTokens;
    }


    // ========================================
    // Normalize Response
    // ========================================

    normalizeResponse(response) {

        return {
            text: response.text
        };

    }

}


module.exports = GeminiProvider;