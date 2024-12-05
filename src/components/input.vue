<template>
  <form class="p-2 flex justify-center shadow-sm" @submit.prevent="submit">
    <div class="max-w-6xl w-[980px] bg-base-200 rounded-box p-2">
      <textarea
        @input="handleIn"
        @change="handleIn"
        @keydown="key"
        v-model.trim="textareaValue"
        ref="textareaEl"
        class="bg-transparent max-h-32 h-[24px] outline-none w-full resize-none p-0"
        placeholder="想问点什么..."
      ></textarea>
      <div class="flex justify-end gap-2">
        <button class="btn btn-circle btn-sm">
          <sendIcon />
        </button>
        <kbd class="kbd kbd-sm" v-show="textareaValue">Enter</kbd>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import sendIcon from "@/assets/icons/send.svg?component";
import { useTemplateRef, ref, nextTick } from "vue";

const textareaEl = useTemplateRef<HTMLTextAreaElement>("textareaEl");
const textareaValue = ref("");

const emit = defineEmits(["send"]);
const handleIn = async () => {
  if (textareaEl.value) {
    await nextTick();
    const textarea = textareaEl.value;

    textarea.style.height = "auto";
    // 如果内容为空，恢复到初始高度
    if (!textareaValue.value) {
      textarea.style.height = "24px";
    } else {
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }
};

const key = (e: any) => {
  if (e.key === "Enter") {
    e.preventDefault();
    submit();
  }
};

const submit = () => {
  if (textareaValue.value) {
    emit("send", textareaValue.value);
    textareaValue.value = "";
    if (textareaEl.value) {
      textareaEl.value.style.height = "24px";
    }
  }
};
</script>

<style scoped></style>
