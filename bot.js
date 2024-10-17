import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { config } from 'dotenv';
import { createSlashCommands } from "./commands/slashCommands/slashCommand.js";
import { configRest } from "./commands/rest-config.js";
config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);

    client.commands = new Collection();
    createSlashCommands(client.commands);

    configRest();
});

client.on(Events.InteractionCreate, async (interaction) => {
    console.log(interaction);

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matches ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "There was an error while executing the command", ephemeral: true });
        } else {
            await interaction.replay({ content: "There was an error while executing the command", ephemeral: true });
        }
    }
})

client.login(process.env.BOT_TOKEN); // Replace with your bot's token