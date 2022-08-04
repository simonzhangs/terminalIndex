import { CommandType } from "./command";
import gotoCommand from "./commands/gotoCommand";

// 命令列表
const commandList: CommandType[] = [
    gotoCommand,
]

// 命令字典
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
    commandMap[command.func] = command;
    command.alias?.forEach((name) => {
        commandMap[name] = command;
    });
});

export { commandList, commandMap };