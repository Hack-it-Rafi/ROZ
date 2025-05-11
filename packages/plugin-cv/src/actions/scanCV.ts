import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateCVScannerConfig } from "../environment";
import { getCVScannerExamples } from "../examples";
import { createCVScannerService } from "../services";

export const scanCVAction: Action = {
    name: "CV_SCANNER_ANALYZE",
    similes: [
        "CV",
        "RESUME",
        "JOB APPLICATION",
        "CANDIDATE SCREENING"
    ],
    description: "Analyze a candidate's CV to evaluate suitability for a job.",
    validate: async (runtime: IAgentRuntime) => {
        await validateCVScannerConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const config = await validateCVScannerConfig(runtime);
        const cvScannerService = createCVScannerService(
            config.CV_PARSER_API_KEY
        );

        try {
            const cvUrl = options.cvUrl as string;
            const jobRequirements = options.jobRequirements as string;

            if (!cvUrl || !jobRequirements) {
                throw new Error("Missing CV URL or job requirements");
            }

            const analysis = await cvScannerService.analyzeCV(cvUrl, jobRequirements);
            elizaLogger.success(`Successfully analyzed CV: ${cvUrl}`);

            if (callback) {
                callback({
                    text: `CV Analysis Complete:\n- Candidate: ${analysis.candidateName}\n- Suitability Score: ${analysis.suitabilityScore}%\n- Key Skills: ${analysis.skills.join(", ")}\n- Experience: ${analysis.experienceYears} years`,
                    content: { analysis }
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in CV Scanner plugin handler:", error);
            callback({
                text: `Error analyzing CV: Queens ${error.message}`,
                content: { error: error.message }
            });
            return false;
        }
    },
    examples: getCVScannerExamples as ActionExample[][]
} as Action;