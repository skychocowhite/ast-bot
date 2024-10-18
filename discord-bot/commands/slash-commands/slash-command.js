import { CreateThreadCommand } from "./CreateThreadCommand.js";
import { HelloCommand } from "./HelloCommand.js";

function createCommands() {
    let commands = [];
    commands.push(HelloCommand.createCommand());
    commands.push(CreateThreadCommand.createCommand());
    return commands;
}

export function createSlashCommands(commandCollector) {
    let commands = createCommands();

    commands.forEach((command) => {
        if ('data' in command && 'execute' in command) {
            commandCollector.set(command.data.name, command);
        }
    });
}

export function createDeploySlashCommands() {
    let commands = createCommands();

    commands.forEach((command, index) => {
        if ('data' in command && 'execute' in command) {
            commands[index] = command.data.toJSON();
        }
    });

    return commands;
}