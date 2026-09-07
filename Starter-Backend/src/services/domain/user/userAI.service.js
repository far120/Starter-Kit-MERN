const GeminiProvider = require("../../ai/providers/GeminiProvider");
const OllamaProvider = require("../../ai/providers/OllamaProvider");
const OpenAIProvider = require("../../ai/providers/OpenAIProvider");
const aiservice = require("../../ai/aiService");
const User = require("../../../models/User");

const analyzeUser = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const prompt = `
        Analyze this user:

        Username: ${user.username}
        Role: ${user.role}
        Active: ${user.isActive}

        Give me a short summary.
    `;

    
    //// make sure to choose the provider you want to use for generating the summary. You can switch between GeminiProvider, OpenAIProvider, and OllamaProvider as needed.
    const geminiProvider = new GeminiProvider(); // Create an instance of the GeminiProvider
    const openAIProvider = new OpenAIProvider(); // Create an instance of the OpenAIProvider
    const ollamaProvider = new OllamaProvider(); // Create an instance of the OllamaProvider
    const aiserviceInstance = new aiservice(ollamaProvider); // Create an instance of the AIService with the OllamaProvider
    return await aiserviceInstance.generate(prompt); // Use the AIService to generate the summary
};




module.exports = {
    analyzeUser
};