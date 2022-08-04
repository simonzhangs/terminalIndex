<template>
<div class="terminal-wrapper" @click="handleClickWrapper">
    <div ref="terminalRef" class="terminal" :style="mainStyle">
        <a-collapse v-model:activeKey="activeKeys" :bordered="false" expand-icon-position="right">
            <template v-for="(output, index) in outputList" :key="index">
                <a-collapse-panel v-if="output.collapsible" :key="index" class="terminal-row">
                    <template #header>
                        <span style="user-select: none;margin-right:10px"> local </span>
                        <span>{{ output.text }}</span>
                    </template>
                    <div v-for="(result, idx) in output.resultList" :key="idx" class="terminal-row">
                        <content-output :output="result" />
                    </div>
                </a-collapse-panel>
                <template v-else>
                    <!-- 输出命令及结果 -->
                    <template v-if="output.type === 'command'">
                        <div class="terminal-row">
                            <span style="user-select: none;margin-right:10px"> local </span>
                            <span>{{ output.text }}</span>
                        </div>
                        <div v-for="(result, idx) in output.resultList" :key="idx" class="terminal-row">
                            <content-output :output="result" />
                        </div>
                    </template>
                    <template v-else>
                        <div class="terminal-row">
                            <content-output :output="output" />
                        </div>
                    </template>
                </template>
            </template>
        </a-collapse>

        <div class="terminal-row">
            <a-input ref="commandInputRef" v-model:value="inputCommand.text" class="command-input"
                :placeholder="inputCommand.placeholder" :bordered="false" autofocus @press-enter="doSubmitCommand">
                <template #addonBefore>
                    <span class="command-input-prompt">local</span>
                </template>
            </a-input>
        </div>
    </div>

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, StyleValue } from 'vue';
import TerminalType = Terminal.TerminalType;
import OutputType = Terminal.OutPutType;
import TextOutputType = Terminal.TextOutputType;
import OutputStatusType = Terminal.OutputStatusType;
import CommandInputType = Terminal.CommandInputType;
import CommandOutputType = Terminal.CommandOutputType;

import UserType = User.UserType;
import { LOCAL_USER } from "../../core/commands/user/userConstant";
import { registerShortcuts } from './shortcuts.js';

import ContentOutput from "./ContentOutput.vue";

interface TerminalProps {
    height?: string | number;
    fullScreen?: boolean;
    user?: UserType;
    onSubmitCommand?: (inputText: string) => void;
}

const props = withDefaults(defineProps<TerminalProps>(), {
    height: "400px",
    fullScreen: false,
    user: LOCAL_USER as any,
})

/* 终端样式 */
const mainStyle = computed(() => {
    const fullScreenStyle: StyleValue = {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    return props.fullScreen ? fullScreenStyle : {height: "1000px"};
})

/* 命令行主节点 */
const terminalRef = ref();

/* 全局记录当前命令，便于写入结果 */
let currentNewCommand: CommandOutputType;

/* 展开、折叠 */
const activeKeys = ref<number[]>([]);
/* 输出列表 */
const outputList = ref<OutputType[]>([]);
/* 命令列表 */
const commandList = ref<CommandOutputType[]>([]);
const commandInputRef = ref();


/* 初始化命令 */
const initCommand: CommandInputType = {
    text: "",
    placeholder: "",
}

/* 待输入的命令 */
const inputCommand = ref<CommandInputType>({
    ...initCommand
})



/* 提交命令（回车） */
const doSubmitCommand = async () => {
    let inputText = inputCommand.value.text;
    // 执行命令
    const newCommand: CommandOutputType = {
        text: inputText,
        type: "command",
        resultList: []
    };
    // 记录当前命令，便于写入结果
    currentNewCommand = newCommand;
    // 执行命令
    await props.onSubmitCommand?.(inputText);
    // 添加输出（为空也要输出换行）
    outputList.value.push(newCommand);
    if (inputText) {
        commandList.value.push(newCommand);
    }
    // 默认展开折叠面板
    activeKeys.value.push(outputList.value.length - 1);
    inputCommand.value = { ...initCommand };
    // 自动滚动到底部
    setTimeout(() => {
        terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
    }, 50)
}

/* 清空所有输出 */
const clear = () => {
    outputList.value = [];
}

/* 立即输出文本 */
const writeTextOutput = (text: string, status?: OutputStatusType) => {
    const newOutput: TextOutputType = {
        text,
        type: "text",
        status,
    };
    outputList.value.push(newOutput);
}

/* 立即输出 */
const writeOutput = (newOutput: OutputType) => {
    outputList.value.push(newOutput);
}

/* 写命令文本结果 */
const writeTextResult = (text: string, status?: OutputStatusType) => {
    const newOutput: TextOutputType = {
        text,
        type: "text",
        status,
    };
    currentNewCommand.resultList.push(newOutput);
}

/* 写文本错误状态结果 */
const writeTextErrorResult = (text: string) => {
    writeTextResult(text, "error");
}

/* 输入框聚焦 */
const focusInput = () => {
    commandInputRef.value.focus();
}

/* 展开、折叠所有的块 */
const toggleAllCollapse = () => {
    // 展开
    if (activeKeys.value.length === 0) {
        activeKeys.value = outputList.value.map((_, index) => {
            return index;
        });
    } else {
        // 折叠
        activeKeys.value = [];
    }
}

// 操作终端的对象
const terminal: TerminalType = {
    clear,
    doSubmitCommand,
    writeOutput,
    writeTextOutput,
    writeTextResult,
    writeTextErrorResult,
    focusInput,
    toggleAllCollapse,
}


onMounted(() => {
    registerShortcuts(terminal);
    terminal.writeTextOutput(
        `Hello World!!!这是一个hin酷炫的终端式浏览器主页！`
    )
})

function handleClickWrapper(event:Event): void {
    //@ts-ignore
    if(event.target.className === 'treminal') {
        focusInput();
    }
}

// defineExpose({
//   terminal,
// });
</script>

<style scoped>
.terminal {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px;
    overflow: scroll;
}

.terminal::-webkit-scrollbar {
    display: none;
}
.terminal span {
    font-size: 16px;
}

.terminal :deep(.ant-collapse-icon-position-right 
> .ant-collapse-item 
> .ant-collapse-header) {
    color: white;
    padding: 0;
}

.terminal :deep(.ant-collapse) {
    background: none;
}
.command-input {
    caret-color: white;
}

.command-input :deep(input) {
    color: white !important;
    font-size: 16px;
    padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
    background: none;
    border: none;
    padding: 0;
}

.command-input-prompt {
    color: white;
    background: transparent;
}

.terminal-row {
    color: white;
    font-size: 16px;
    font-family: 'Courier New', Courier, monospace;
}
</style>
