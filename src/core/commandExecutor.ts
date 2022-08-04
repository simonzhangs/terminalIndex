import getopts, {ParsedOptions} from "getopts";
import { commandMap } from "./commandRegister";
import { CommandOptionType, CommandType } from "./command";
import TerminalType = Terminal.TerminalType;


/* 执行命令 */
export const doCommandExecute = async(
    text: string,
    terminal: TerminalType,
    parentCommand?: CommandType
) => {
    if(!text) {
        return;
    }
    // 解析文本，得到命令
    const command: CommandType = getCommand(text, parentCommand);
    if(!command) {
        terminal.writeTextErrorResult("找不到命令");
        return;
    }
    // 解析参数
    const parsedOptions = doParse(text, command.options);
    const { _ } = parsedOptions;
    // 有子命令，执行
    if(
        _.length > 0 &&
        command.subCommands &&
        Object.keys(command.subCommands).length > 0
    ) {
        // 把子命令当做新命令解析， user login xxx => login xxx
        const subText = text.substring(text.indexOf(" ") + 1);
        await doCommandExecute(subText, terminal, command);
    }
    // 执行命令
    await doAction(command, parsedOptions, terminal, parentCommand);
}

/* 
获取命令 
*/
const getCommand = (text: string, parentCommand?: CommandType): CommandType => {
    const func = text.split(" ",1)[0];
    let commands = commandMap;
    if(
        parentCommand &&
        parentCommand.subCommands &&
        Object.keys(parentCommand.subCommands).length > 0
    ) {
        commands = parentCommand.subCommands;
    }
    const command = commands[func];
    console.log("getCommand", command);
    return command;
}

/**
 * 解析参数
 */
const doParse = (
    text: string,
    commandOptions: CommandOptionType[],
): getopts.ParsedOptions => {
    // 过滤关键词
    const args: string[] = text.split(" ").slice(1);
    const options: getopts.Options = {
        alias: {},
        default: {},
        string: [],
        boolean: [],
    };
    commandOptions.forEach((commandOptions) => {
        const { alias, key, type, defaultValue } = commandOptions;
        if(alias && options.alias) {
            options.alias[key] = alias;
        }
        options[type]?.push(key);
        if(defaultValue && options.default) {
            options.default[key] = defaultValue;
        }
    });
    const parsedOptions = getopts(args, options);
    console.log("parsedOptions = ", parsedOptions);
    return parsedOptions;
}

/* 
执行命令
 */
const doAction = async (
    command: CommandType,
    options: ParsedOptions,
    terminal: TerminalType,
    parentCommand?: CommandType
) => {
    await command.action(options, terminal);
}