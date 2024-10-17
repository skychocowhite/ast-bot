import { SlashCommandBuilder } from "discord.js";
import { Command } from "./Command.js";

export class HelloCommand extends Command {
    static createCommand() {
        return {
            data: new SlashCommandBuilder()
                .setName("hello")
                .setDescription("Say hello to others"),
            async execute(interaction) {
                await interaction.reply({ content: "Hello, I'm Hatsune Miku!", ephemeral: true });
            }
        };
    }
}