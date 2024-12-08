<template>
  <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
  <ul class="menu min-h-full w-60 p-4 shadow-sm bg-base-100 border-r-[1px] border-base-300">
    <!-- Sidebar content here -->
    <li v-for="item in menulist">
      <a>
        <component :is="item.icon" width="18"></component>
        {{ item.name }}
      </a>
    </li>

    <h2 class="menu-title">功能</h2>

    <li>
      <a>
        <gptIcon width="18" />CHATGPT
      </a>
    </li>

    <h2 class="menu-title flex items-center gap-2">
      记录
      <div class="tooltip tooltip-right" data-tip="新建会话">
        <addSessionIcon width="16" class="cursor-pointer" @click="sessionEl?.addSession()" />
      </div>
    </h2>

    <session ref="sessionEl" />
  </ul>
</template>

<script setup lang="ts">
import { reactive, markRaw, useTemplateRef } from "vue";
import envelopeIcon from "@/assets/icons/envelope.svg?component";
import penIcon from "@/assets/icons/pen.svg?component";
import gptIcon from "@/assets/icons/gpt.svg?component";
import addSessionIcon from "@/assets/icons/add-session.svg?component";

import session from "./session.vue";

const menulist = reactive([
  { name: "联系我", icon: markRaw(envelopeIcon) },
  { name: "BUG反馈", icon: markRaw(penIcon) },
]);

const sessionEl = useTemplateRef("sessionEl");
</script>

<style scoped></style>
