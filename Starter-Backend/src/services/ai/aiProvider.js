class AIProvider {

    // ========================================
    // Generate
    // ========================================

    async generate(input, options = {}) {
        throw new Error("generate() must be implemented");
    }


    // ========================================
    // Count Tokens
    // ========================================

    async countTokens(input) {
        throw new Error("countTokens() must be implemented");
    }
}


module.exports = AIProvider;