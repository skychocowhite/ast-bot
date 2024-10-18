import { REST, Routes } from "discord.js";
import { createDeploySlashCommands } from "./slash-commands/slashCommand.js";


export async function configRest() {
    const rest = new REST().setToken(process.env.BOT_TOKEN);
    await deploySlashCommands(rest);
}

async function deploySlashCommands(restAPI) {
    let commands = createDeploySlashCommands();

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await restAPI.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
}