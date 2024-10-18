import { configDotEnv } from "./config.js";
import { bootDiscordBot } from "./discord-bot/bot.js";

configDotEnv();
bootDiscordBot();
