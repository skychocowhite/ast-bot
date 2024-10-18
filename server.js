import express from 'express';
import { configDotEnv } from "./config.js";
import { bootDiscordBot, createDiscordBot } from "./discord-bot/bot.js";

function boot() {
    configDotEnv();

    // Discord bot
    const bot = createDiscordBot();
    bootDiscordBot(bot);

    // Create server
    const app = express();
    app.use(express.json());

    app.post('/hello', async (req, res) => {
        bot.emit("server-command", "rest-hello", req, res);
    });

    const port = 3000
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

boot();