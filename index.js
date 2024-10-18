import { configDotEnv } from "./config.js";
import { bootDiscordBot, createDiscordBot } from "./discord-bot/bot.js";

configDotEnv();
const bot = createDiscordBot();
bootDiscordBot(bot);
