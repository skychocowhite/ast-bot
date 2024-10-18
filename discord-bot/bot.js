import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { createSlashCommands } from "./commands/slash-commands/slashCommand.js";
import { configRest } from "./commands/rest-config.js";

export function createDiscordBot() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
    return client;
}

export async function bootDiscordBot(client) {
    client.once(Events.ClientReady, async () => {
        console.log(`Logged in as ${client.user.tag}`);

        client.commands = new Collection();
        createSlashCommands(client.commands);

        await configRest();

        console.log("Miku is running...");
    });

    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matches ${interaction.commandName}`);
            return;
        }

        try {
            console.log(`Received command: ${interaction.commandName}`);
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "There was an error while executing the command", ephemeral: true });
            } else {
                await interaction.reply({ content: "There was an error while executing the command", ephemeral: true });
            }
        }
    })

    client.login(process.env.BOT_TOKEN); // Replace with your bot's token
}