# 项目介绍

很酷😎的终端式浏览器主页，通过在浏览器主页输入终端命令就可以执行各种便捷浏览器操作，比如说搜索、跳转、翻译、摸鱼......

# 项目背景

1. 实际需求，会开很多网页，反复跳转，通过终端式命令来操作，更符合程序员习惯
2. 网上没有类似的项目
3. 在前端领域，很少有分享Web终端知识
4. 有趣的东西，学习新技术和实践（ Vue3 + Pinia + Vite2 + Nodejs | TS + prettier + Eslint）

# 构思 + 需求分析

调研常见的浏览器工具、其他浏览器主页

需求（优先级考虑）
- 终端，能够输入命令后输出
- 命令行解析
- 项目通用性（规范、系统设计，比如提示系统、快捷键系统......)
- 开发命令

## 命令集记录

### 网站跳转 

goto/open/jump 打开链接（传入网址）

### 搜索

search/sou bilinili|zhihu|douban|github|bing

### 音乐

music 歌曲

### 翻译

fanyi 句子、词语

### 热榜资讯

rebang/hot weibo|zhihu|...

# 技术选型

> 尽量选择现成能满足需求的。

## 前端技术选型

- Vue3 前端开发，主流
- Vite2 前端构建工具，本地编译速度快，提升开发效率
- Ant Design Vue3 组件库 （支持Vue和React，更通用）
- Pinia2 状态管理（pinia兼容Vuex）
- TypeScript 类型控制 （项目规范，编辑器会给出类型检查提示）
- Eslint 代码规范控制 （项目规范，自动语法检验）
- Prettier 美化代码 （项目规范，自动格式化代码）

依赖库：
- axios 网络请求
- dayjs 时间处理
- loadsh 工具库
- getopts 命令参数解析

## 后端技术选型

- Nodejs
- Express、express-session
- MySQL
- Sequelize
- Redis

依赖库：
- axios
- 网易云音乐 NeteaseCloudMusicApi

依赖服务：
- 百度翻译API
- ......






# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
