import { Plugin } from "@elizaos/core";
import { postAction } from "./actions/post";
import { checkNewFollowersAction } from "./actions/follower";

export const twitterPlugin: Plugin = {
    name: "twitter",
    description: "Twitter integration plugin for posting tweets",
    actions: [postAction],
    evaluators: [],
    providers: [],
};

export default twitterPlugin;
