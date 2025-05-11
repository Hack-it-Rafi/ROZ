import { CVAnalysisResponse } from "./types";

export const createCVScannerService = (apiKey: string) => {
    const analyzeCV = async (cvUrl: string, jobRequirements: string): Promise<CVAnalysisResponse> => {
        if (!apiKey || !cvUrl || !jobRequirements) {
            throw new Error("Invalid parameters");
        }

        try {
            // Placeholder for actual CV parsing API call
            // Example: Call to a service like Affinda, Parsio, or a custom LLM-based parser
            const response = await fetch("https://api.cvparser.com/analyze", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cvUrl,
                    jobRequirements
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.message || response.statusText);
            }

            const data = await response.json();
            return {
                candidateName: data.name || "Unknown",
                skills: data.skills || [],
                experienceYears: data.experienceYears || 0,
                suitabilityScore: data.suitabilityScore || 0
            };
        } catch (error: any) {
            console.error("CV Parser API Error:", error.message);
            throw error;
        }
    };

    return { analyzeCV };
};