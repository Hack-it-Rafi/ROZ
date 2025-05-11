import { ActionExample } from "@elizaos/core";

export const getCVScannerExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you analyze this CV for the developer job?"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Please provide the CV URL and job requirements.",
                action: "CV_SCANNER_ANALYZE",
                options: {
                    cvUrl: "https://example.com/cv.pdf",
                    jobRequirements: "3+ years of Solidity experience, TypeScript, Web3"
                }
            }
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I have a candidate's resume. Is it a good fit for a UI designer role?"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Please share the resume URL and the specific requirements for the UI designer role.",
                action: "CV_SCANNER_ANALYZE",
                options: {
                    cvUrl: "https://example.com/resume.pdf",
                    jobRequirements: "Experience with Figma, 2+ years in UI/UX design"
                }
            }
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Screen this CV for a smart contract developer position."
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Got it. Please provide the CV URL and job details, and I'll analyze it for suitability.",
                action: "CV_SCANNER_ANALYZE",
                options: {
                    cvUrl: "https://example.com/dev_cv.pdf",
                    jobRequirements: "Solidity, Rust, 5+ years in blockchain development"
                }
            }
        }
    ]
];