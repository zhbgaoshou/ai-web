<script setup lang="ts">
import { watch, ref } from "vue";
import moreDropIcon from "@/assets/icons/more-drop.svg?component";
import deleteIcon from "@/assets/icons/delete.svg?component";
import editIcon from "@/assets/icons/edit.svg?component";

import { useChatStore, useUserStore } from "@/store";

import {
  deleteSessionApi,
  addSessionApi,
  toggleSessionApi,
} from "@/api/openai";

const chatStore = useChatStore();
const userStore = useUserStore();

const getSession = async () => {
  const user_id = userStore.userId as number;
  await chatStore.getSession(user_id);
};

const deleteSession = async (id: number, dropdownRef: any) => {
  await deleteSessionApi(id);
  getSession();

  // Close the dropdown
  dropdownRef.value?.classList.remove("dropdown-open");
};

const addSession = async () => {
  const data = {
    name: "新会话",
    user_id: userStore.userId,
  };
  await addSessionApi(data);

  getSession();
};

const toggleSession = async (id: number) => {
  if (id === chatStore.activeSession.id) return;
  await toggleSessionApi(id);
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

defineExpose({
  addSession,
});
</script>

<template>
  <div class="dropdown dropdown-end my-[2px]" v-for="item in chatStore.sessions" :key="item.id">
    <li class="group" @click="toggleSession(item.id)">
      <a :class="{ active: item.active }" class="parent">
        <span></span>{{ item.name }}
        <button :tabindex="0" class="more-drop" @click.stop>
          <moreDropIcon class="invisible group-hover:visible" />
        </button>
      </a>
    </li>
    <ul ref="dropdownRef" :tabindex="0" class="dropdown-content w-max timeline-box bg-base-100 z-[1] p-2">
      <li>
        <a>编辑
          <editIcon width="18" />
        </a>
      </li>
      <li @click="deleteSession(item.id, $refs.dropdownRef)">
        <a class="!text-error">删除
          <deleteIcon width="18" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
