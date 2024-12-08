<template>
  <div class="navbar-start">
    <label for="my-drawer-3" aria-label="open sidebar" class="mr-1 md:hidden btn btn-square btn-sm btn-ghost">
      <moreIcon width="24" />
    </label>
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-sm btn-ghost">
        {{ chatStore.activeModel?.name }}
        <downIcon />
      </div>
      <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-80 p-2 shadow">
        <li @click="toggleModelApi(item)" v-for="item in chatStore.models">
          <a><span></span>
            <div>
              {{ item.name }}
              <p class="text-xs text-base-content opacity-60">
                {{ item.desc }}
              </p>
            </div>
            <successIcon width="18" v-show="item.active" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import moreIcon from "@/assets/icons/more.svg?component";
import downIcon from "@/assets/icons/down.svg?component";
import successIcon from "@/assets/icons/success.svg?component";
import { useChatStore } from "@/store";

const chatStore = useChatStore();

function toggleModelApi(item: any) {
  if (item.active) return;
  chatStore.toggleModel(item.id);
}

chatStore.getModel();
</script>

<style scoped></style>
