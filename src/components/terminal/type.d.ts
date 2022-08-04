declare namespace Terminal {
    // 输出状态
    type OutputStatusType = "info" | "sucess" | "warning" | "error" | "system";

    // 输出类型
    interface OutPutType {
        type: "command" | "text" | "component";
        text?: string;
        resultList?: OutPutType[];
        component?: any;
        status?: OutputStatusType;
        props?: any;
        collapsible?: boolean;
    }

    // 命令类型输出
    interface CommandOutputType extends OutPutType {
        type: "command";
        text: string;
        resultList: OutPutType[];
    }

    // 文本类型输出
    interface TextOutputType extends OutPutType {
        type: "text";
        text: string;
    }

    // 组件类型输出
    interface ComponentOutputType extends OutPutType {
        type: "component";
        component: any;
        props?: any;
    }

    // 命令输入类型
    interface CommandInputType {
        text: string;
        placeholder?: string;
    }

    // 终端类型（定义一组访问和操作终端的方法）
    interface TerminalType {
        // 清屏
        clear: () => void;
        // 提交命令
        doSubmitCommand: ()=> void;
        // 立即输出
        writeOutput: (output: OutPutType) => void;
        // 立即输出文本
        writeTextOutput: (text: string, status?: OutputStatusType) => void;
        // 写命令文本结果
        writeTextResult: (text: string, status?: OutputStatusType) => void;
        // 写命令错误文本结果
        writeTextErrorResult: (text: string) => void;
        // todo...
        // 输入框聚焦
        focusInput: () => void;
        // 折叠 | 展开所有块
        toggleAllCollapse: () => void;
    }
}