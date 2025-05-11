import { Plugin } from "@elizaos/core";
import { scanCVAction } from "./actions/scanCV";

export const cvScannerPlugin: Plugin = {
    name: "cvScanner",
    description: "Plugin for scanning and analyzing candidate CVs",
    actions: [scanCVAction],
    evaluators: [],
    providers: []
};

export default cvScannerPlugin;