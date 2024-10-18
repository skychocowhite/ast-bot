import { RestHelloCommand } from "./RestHelloCommand.js";

function createCommands() {
    let commands = [];
    commands.push(RestHelloCommand.createCommand());
    return commands;
}

export function createRestCommands(commandCollector) {
    let commands = createCommands();

    commands.forEach((command) => {
        if ('name' in command && 'data' in command && 'execute' in command) {
            commandCollector.set(command.name, command);
        }
    });
}