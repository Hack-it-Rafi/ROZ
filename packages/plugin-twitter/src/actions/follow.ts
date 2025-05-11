import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

dotenv.config();

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function checkNewFollowers() {
    try {
        const { data: user } = await client.v2.me();
        const userId = user.id;

        const { data: followers } = await client.v2.followers(userId, { max_results: 5 });

        for (const follower of followers) {
            console.log(`New follower: @${follower.username} (ID: ${follower.id})`);

            try {
                await client.v2.follow(userId, follower.id);
                console.log(`Followed @${follower.username}`);
            } catch (error) {
                console.error(`Error following @${follower.username}:`, error);
            }
        }
    } catch (error) {
        console.error("Error checking followers:", error);
    }
}

// setInterval(checkNewFollowers, 60000);
