/* 快捷键注册 */
/* 统一注册，可扩展 */
import TerminalType = Terminal.TerminalType;

// 注册快捷键
export const registerShortcuts = (terminal: TerminalType) => {
    document.onkeydown = (e) => {
        let key = e.key;
        // 自动聚焦输入框
        if (key >= "a" && key <= "z" && !e.metaKey && !e.shiftKey && !e.ctrlKey) {
            terminal.focusInput();
            return;
        }
        // 匹配快捷键
        let code = e.code;
        for(const shortcut of shortcutList) {
            if (code === shortcut.code && 
                e.ctrlKey == !!shortcut.ctrlKey &&
                e.metaKey == !!shortcut.metaKey &&
                e.shiftKey == !!shortcut.shiftKey               
            ) {
                shortcut.action(e, terminal);
            }
        }
    }
}

// 快捷键类型
interface ShortcutType {
    code: string;  //按键码
    desc?: string; // 功能描述
    keyDesc?: string; // 按键描述
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    action: (e: Event, terminal: TerminalType) => void;
}


// 快捷键列表
export const shortcutList: ShortcutType[] = [
    {
        code: "KeyL",
        desc: "清屏",
        keyDesc: "Ctrl + L",
        ctrlKey: true,
        action(e, terminal) {
            e.preventDefault();
            terminal.clear();
        }
    },
    {
        code: "KeyO",
        desc: "折叠",
        keyDesc: "Ctrl + O",
        ctrlKey: true,
        action(e, terminal) {
            e.preventDefault();
            terminal.toggleAllCollapse();
        }
    }
]