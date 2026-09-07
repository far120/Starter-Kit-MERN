const logger = require("../../config/WistonLogger");

const MAX_INPUT_TOKENS = 4000;
const MAX_OUTPUT_TOKENS = 500;

const MAX_RETRIES = 3;
const TIMEOUT = 10000; // 10 seconds


class AIService {

    constructor(provider) {
        this.provider = provider;
    }


    // ========================================
    // Generate AI Response
    // ========================================

    async generate(prompt) {

        // 1. Validate input
        this.validateInput(prompt);


        // 2. Check input token limit
        await this.checkInputTokens(prompt);


        // 3. Generate response with timeout + retry
        const result = await this.generateWithRetry(prompt);


        // 4. Validate AI output
        this.validateOutput(result);


        // 5. Log successful request
        logger.info("AI request completed successfully");


        return result;
    }


    // ========================================
    // Input Validation
    // ========================================

    validateInput(prompt) {

        if (!prompt) {
            throw new Error("Prompt is required");
        }

        if (typeof prompt !== "string") {
            throw new Error("Prompt must be a string");
        }

        if (prompt.trim().length === 0) {
            throw new Error("Prompt cannot be empty");
        }
    }


    // ========================================
    // Token Limit
    // ========================================

    async checkInputTokens(prompt) {

        const tokenCount =
            await this.provider.countTokens(prompt);

        if (tokenCount > MAX_INPUT_TOKENS) {
            throw new Error("Input exceeds maximum token limit");
        }
    }


    // ========================================
    // Retry + Timeout
    // ========================================

    async generateWithRetry(prompt) {

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {

            try {

                const result = await this.withTimeout(
                    this.provider.generate(prompt),
                    TIMEOUT
                );

                return result;

            } catch (error) {

                logger.error(
                    `AI request failed - attempt ${attempt}`,
                    {
                        message: error.message,
                        status: error.status || error.statusCode
                    }
                );


                if (!this.shouldRetry(error)) {
                    throw error;
                }


                if (attempt === MAX_RETRIES) {
                    throw error;
                }


                const delay =
                    1000 * Math.pow(2, attempt - 1);

                await this.sleep(delay);
            }
        }
    }


    // ========================================
    // Retry Policy
    // ========================================

    shouldRetry(error) {

        const status =
            error.status || error.statusCode;

        return [429, 500, 502, 503, 504]
            .includes(status);
    }


    // ========================================
    // Timeout
    // ========================================

    withTimeout(promise, ms) {

        const timeout = new Promise((_, reject) => {

            setTimeout(() => {
                reject(
                    new Error("AI request timed out")
                );
            }, ms);

        });

        return Promise.race([
            promise,
            timeout
        ]);
    }


    // ========================================
    // Output Validation
    // ========================================

    validateOutput(result) {

        if (!result) {
            throw new Error("AI returned an empty response");
        }

        if (typeof result !== "string") {
            throw new Error("AI response must be a string");
        }
    }


    // ========================================
    // Helpers
    // ========================================

    sleep(ms) {

        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
}


module.exports = AIService;