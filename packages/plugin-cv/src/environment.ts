import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const cvScannerEnvSchema = z.object({
    CV_PARSER_API_KEY: z.string().min(1, "CV Parser API key is required")
});

export type CVScannerConfig = z.infer<typeof cvScannerEnvSchema>;

export async function validateCVScannerConfig(
    runtime: IAgentRuntime
): Promise<CVScannerConfig> {
    try {
        const config = {
            CV_PARSER_API_KEY: runtime.getSetting("CV_PARSER_API_KEY")
        };
        return cvScannerEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `CV Scanner configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}