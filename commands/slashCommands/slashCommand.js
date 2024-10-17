import { HelloCommand } from "./HelloCommand.js";

export function createSlashCommands(commandCollector) {
    let command = HelloCommand.createCommand();

    if ('data' in command && 'execute' in command) {
        commandCollector.set(command.data.name, command);
    }
}

export function createDeploySlashCommands() {
    let commands = []

    let command = HelloCommand.createCommand();
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    }

    return commands;
}