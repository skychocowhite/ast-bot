import { SlashCommandBuilder } from "discord.js";
import { Command } from "./Command.js";

export class CreateThreadCommand extends Command {
    static createCommand() {
        return {
            data: new SlashCommandBuilder()
                .setName("create-thread")
                .setDescription("Create a new thread")
                .addStringOption(option =>
                    option
                        .setName("name")
                        .setDescription("Name of new thread")
                        .setRequired(true)
                ),
            execute
        };
    }
}

async function execute(interaction) {
    const threadName = interaction.options.getString("name");
    const channel = interaction.channel;

    if (!channel?.isTextBased()) {
        await interaction.reply({ content: "Channel not found", ephemeral: true });
        throw Error("Channel not found");
    }

    await channel.threads.fetch();
    const thread = channel.threads.cache.find(t => t.name === threadName);

    if (thread) {
        await interaction.reply({ content: `The thread ${threadName} already existed`, ephemeral: true });
        return;
    }

    try {
        await channel.threads.create({
            name: threadName,
            reason: `Create thread ${threadName}`
        });
        console.log(`Thread ${threadName} has been created in channel ${channel.name}`)
        await interaction.reply({ content: `Thread ${threadName} has been created` });
    } catch (error) {
        await interaction.reply({ content: `There is an error for creating thread ${threadName}`, ephemeral: true });
        throw error;
    }
}