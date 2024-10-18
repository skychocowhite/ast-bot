import { Command } from "../Command.js";

export class RestHelloCommand extends Command {
    static createCommand() {
        const command = new RestHelloCommand();
        return {
            name: "rest-hello",
            data: command,
            execute: command.execute
        };
    }

    async execute(client, req, res) {
        await client.guilds.fetch();
        const guild = client.guilds.cache.get(process.env.GUILD_ID);

        if (!guild) {
            res.status(404)
                .send({
                    error: "Discord guild not found"
                });
            throw Error("Discord guild not found");
        }

        await guild.channels.fetch();
        const channel = guild.channels.cache.get(process.env.AST_CHANNEL_ID);

        if (!channel?.isTextBased()) {
            res.status(400)
                .send({
                    error: "Cannot find ast channel or not a text channel"
                });
            throw Error("Cannot find ast channel or not a text channel");
        }

        try {
            await channel.send("Hello I'm Hatsune Miku.\n \
                                This is a RESTful command - hello triggered");
        } catch (e) {
            console.error("There is an error for REST command - hello");
            res.status(500)
                .send({
                    error: e
                });
            throw e;
        }

        res.status(200).send({
            "result": "success"
        });
    }
}