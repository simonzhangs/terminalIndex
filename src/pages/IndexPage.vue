<template>
    <Terminal 
        ref="terminalRef"
        full-screen
        :on-submit-command="onSubmitCommand"
    />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { doCommandExecute } from '../core/commandExecutor.js';



const terminalRef = ref();

const onSubmitCommand = async (inputText: string) => {
    if(!inputText) {
        return;
    }
    const terminal = terminalRef.value.terminal;
    await doCommandExecute(inputText, terminal);
}

onMounted(() => {
    console.log("IndexPage mounted!")
})

</script>

<style></style>