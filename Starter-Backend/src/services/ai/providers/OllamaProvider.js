const AIProvider = require("../aiProvider");
const { Ollama } = require("ollama");


// ========================================
// Ollama Configuration
// ========================================

const MODEL = "gemma4:31b-cloud";




// ========================================
// Initialize Ollama Client
// ========================================
const client = new Ollama({
    host: "http://127.0.0.1:11434"
});

// ========================================
// Ollama Provider
// ========================================

class OllamaProvider extends AIProvider {


    // ========================================
    // Generate
    // ========================================

    async generate(input, options = {}) {

        const response = await client.generate({
            model: MODEL,
            prompt: input,
            stream: false,
            options: {
                temperature: options.temperature,
                num_predict: options.maxOutputTokens
            }
        });
        return response.response;
    }

    // ========================================
    // Count Tokens
    // ========================================

    async countTokens(input) {

        const response = await client.generate({
            model: MODEL,
            prompt: input,
            stream: false,
            options: {
                num_predict: 1
            }
        });

        return response.prompt_eval_count;
    }

}


module.exports = OllamaProvider;