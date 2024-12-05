<script setup lang="ts">
import { watch, ref } from "vue";
import moreDropIcon from "@/assets/icons/more-drop.svg?component";
import deleteIcon from "@/assets/icons/delete.svg?component";
import editIcon from "@/assets/icons/edit.svg?component";

import { useChatStore, useUserStore } from "@/store";

import { deleteSessionApi } from "@/api/openai";

const chatStore = useChatStore();
const userStore = useUserStore();

const getSession = async () => {
  const user_id = userStore.userId as number;
  await chatStore.getSession(user_id);
};

const deleteSession = async (id: number) => {
  await deleteSessionApi(id);

  getSession();
};

watch(
  () => userStore.userId,
  async (value) => {
    if (value) {
      await getSession();
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div
    class="dropdown dropdown-end my-[2px]"
    v-for="item in chatStore.sessions"
  >
    <li class="group">
      <a :class="{ active: item.active }" class="parent">
        <span></span>{{ item.name }}
        <button :tabindex="0" class="more-drop">
          <moreDropIcon class="invisible group-hover:visible" />
          <!-- <moreDropIcon /> -->
        </button>
      </a>
    </li>
    <ul
      :tabindex="0"
      class="dropdown-content w-max timeline-box bg-base-100 z-[1] p-2"
    >
      <li>
        <a
          >编辑
          <editIcon width="18" />
        </a>
      </li>
      <li @click="deleteSession(item.id)">
        <a class="!text-error"
          >删除
          <deleteIcon width="18" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
