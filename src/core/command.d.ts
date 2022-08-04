import { ParsedOptions } from "getopts";
import TerminalType = Terminal.TerminalType;

// 命令类型
interface CommandType {
    func: string;
    name: string;
    desc?: string;
    alias?: string[];
    params?: CommandParamsType[];
    options: CommandOptionType[];
    subCommands?: Record<string, CommandType>;
    action: (
        options: ParsedOptions,
        terminal: TerminalType,
        parentCommand?: CommandType
     ) => void;
    collapsible?: boolean;
}

// 命令参数类型
interface CommandParamsType {
    key: string;
    desc?: string;
    defaultValue?: string|boolean;
    required?: boolean;
}

// 命令选项类型
interface CommandOptionType {
    key: string;    // 参数名，eg. --word
    alias?: string[]; // 命令简写，eg. -w
    desc?: string;  // 描述
    type: "string" | "boolean";
    defaultValue?: string | boolean;  // 默认值
    required?: boolean;  // 是否必填
}