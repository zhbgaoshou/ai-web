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

    <h2 class="menu-title">记录</h2>

    <div class="dropdown dropdown-end my-[2px]" v-for="i in 5">
      <li class="group">
        <a :class="{ active: i === 1 }" class="parent">
          <span></span>新会话

          <button :tabindex="0" class="more-drop">
            <moreDropIcon class="invisible group-hover:visible" />
          </button>
        </a>
      </li>
      <ul :tabindex="0" class="dropdown-content w-max timeline-box bg-base-100 z-[1] p-2">
        <li>
          <a>编辑
            <editIcon width="18" />
          </a>
        </li>
        <li>
          <a class="!text-error">删除
            <deleteIcon width="18" />
          </a>
        </li>
      </ul>
    </div>
  </ul>
</template>

<script setup lang="ts">
import { reactive, markRaw } from "vue";
import envelopeIcon from "@/assets/icons/envelope.svg?component";
import penIcon from "@/assets/icons/pen.svg?component";
import gptIcon from "@/assets/icons/gpt.svg?component";
import moreDropIcon from "@/assets/icons/more-drop.svg?component";
import deleteIcon from "@/assets/icons/delete.svg?component";
import editIcon from "@/assets/icons/edit.svg?component";

const menulist = reactive([
  { name: "联系我", icon: markRaw(envelopeIcon) },
  { name: "BUG反馈", icon: markRaw(penIcon) },
]);
</script>

<style scoped></style>
