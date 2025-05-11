import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

dotenv.config();

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

export const checkNewFollowersAction: Action = {
    name: "TWITTER_CHECK_NEW_FOLLOWERS",
    similes: [
        "TWITTER",
        "NEW FOLLOWERS",
        "FOLLOW BACK",
    ],
    description: "Check for new Twitter followers and follow them back.",
    validate: async (runtime: IAgentRuntime) => {
        if (!process.env.TWITTER_BEARER_TOKEN) {
            throw new Error("Twitter Bearer Token is not configured in environment variables.");
        }
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        try {
            const { data: user } = await client.v2.me();
            const userId = user.id;
            const { data: followers } = await client.v2.followers(userId, { max_results: 5 });

            for (const follower of followers) {
                elizaLogger.info(`New follower: @${follower.username} (ID: ${follower.id})`);

                try {
                    await client.v2.follow(userId, follower.id);
                    elizaLogger.success(`Followed @${follower.username}`);
                } catch (error: any) {
                    elizaLogger.error(`Error following @${follower.username}:`, error);
                    if (callback) {
                        callback({
                            text: `Error following @${follower.username}: ${error.message}`,
                            content: { error: error.message },
                        });
                    }
                }
            }

            if (callback) {
                callback({
                    text: `Successfully followed new followers.`,
                });
            }
            return true;
        } catch (error: any) {
            elizaLogger.error("Error checking Twitter followers:", error);
            if (callback) {
                callback({
                    text: `Error checking Twitter followers: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    examples: [
        [
            {
                input: "Check for new Twitter followers",
                output: "Successfully followed new followers.",
            },
        ],
    ] as unknown as ActionExample[][],
} as Action;
