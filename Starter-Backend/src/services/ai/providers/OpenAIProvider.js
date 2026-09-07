const AIProvider = require("../aiProvider");
const OpenAI = require("openai");


// ========================================
// OpenAI Configuration
// ========================================

const MODEL = "gpt-5.6-luna";


// ========================================
// Initialize OpenAI Client
// ========================================

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


// ========================================
// OpenAI Provider
// ========================================

class OpenAIProvider extends AIProvider {


    // ========================================
    // Generate
    // ========================================

    async generate(input, options = {}) {

        const response = await client.responses.create({
            model: MODEL,
            input: input,
            max_output_tokens: options.maxOutputTokens
        });
        return response.output_text;
    }


    // ========================================
    // Count Tokens
    // ========================================

    async countTokens(input) {
        // Token counting implementation
        // will depend on the OpenAI model/API.
        throw new Error(
            "countTokens() is not implemented yet for OpenAIProvider"
        );
    }

}


module.exports = OpenAIProvider;