<template>
  <div class="navbar-end">
    <!-- icons -->
    <section class="mx-2">
      <!-- settings -->
      <div class="dropdown dropdown-end">
        <div class="tooltip tooltip-left" data-tip="设置">
          <div tabindex="1" class="btn btn-sm btn-ghost btn-square" role="button">
            <settinIcon width="20" />
          </div>
        </div>

        <ul tabindex="1" class="dropdown-content menu bg-base-200 rounded-box z-[1] w-64 p-2 shadow">
          <li>
            <a>
              <widthIcon width="18" />全屏宽<input type="checkbox" class="toggle" v-model="settingStore.isFullWidth" />
            </a>
          </li>
        </ul>
      </div>
      <!-- theme -->
      <div class="dropdown dropdown-end">
        <div class="tooltip tooltip-left" data-tip="主题">
          <div tabindex="1" class="btn btn-sm btn-ghost btn-square" role="button">
            <themeIcon width="20" />
          </div>
        </div>

        <ul tabindex="1" class="dropdown-content bg-base-300 rounded-box z-[1] w-64 p-2 shadow">
          <li
            class="timeline-box hover:-translate-y-1 transition-all my-2 rounded-md cursor-pointer flex justify-between items-center"
            :style="{ backgroundColor: value['base-100'] }" v-for="(value, key) in themes" @click="setTheme(key)">
            <div class="flex gap-2" :style="{
              color: value['color-scheme'] === 'dark' ? '#e2e8f0' : '#334155',
            }">
              <successIcon width="16" v-show="key === settingStore.currentTheme" />
              <span :style="{ fontFamily: value.fontFamily }">{{ key }}</span>
            </div>

            <div class="flex justify-center items-center gap-1">
              <span class="block w-4 h-4 rounded-full" :style="{
                backgroundColor: value.primary,
                'border-radius': value['--rounded-badge'],
              }"></span>
              <span class="block w-4 h-4 rounded-full" :style="{
                backgroundColor: value.secondary,
                'border-radius': value['--rounded-box'],
              }"></span>
              <span class="block w-4 h-4 rounded-full" :style="{
                backgroundColor: value.accent,
                'border-radius': value['--rounded-btn'],
              }"></span>
              <span class="block w-4 h-4 rounded-full" :style="{
                backgroundColor: value.neutral,
                'border-radius': value['--tab-radius'],
              }"></span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!-- auth -->
    <section>
      <div v-if="userStore.isLogin" class="dropdown dropdown-end">
        <avatar :btn="true" />
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
          <li>
            <a>
              <userIcon width="16" />个人中心
              <rightIcon width="16" />
            </a>
          </li>
          <li>
            <a>
              <useIcon width="16" />使用情况
              <rightIcon width="16" />
            </a>
          </li>
          <div class="divider">OR</div>

          <li @click="userStore.logout">
            <a class="btn">
              退出登录
              <logoutIcon width="16" />
            </a>
          </li>
        </ul>
      </div>

      <div v-else class="avatar placeholder btn btn-sm btn-circle" @click="isOpenModal = true">
        <div class="bg-neutral text-neutral-content w-full rounded-full">
          <span class="text-xs">登录</span>
        </div>
      </div>
    </section>
  </div>
  <modal v-model:open="isOpenModal">
    <div class="flex items-center gap-2">
      <infoIcon width=" 15" /><span class="text-xs text-secondary">注册时邮箱用来找回密码,可以不填</span>
    </div>
    <div role="tablist" class="tabs tabs-boxed">
      <a role="tab" @click="toggleTab(item)" class="tab" :class="item.active ? 'tab-active' : ''"
        v-for="item in tablist">{{ item.text }}</a>
    </div>
    <auth :tablist="tablist" @login-success="loginSuccess" @toggle-tab="toggleTab" />
  </modal>

  <div class="toast toast-top toast-center z-[9999]" v-if="toast">
    <div class="alert alert-success">
      <span class="flex">
        <successIcon width="18" class="mr-2" />
        {{ userStore.userName }} 登录成功
      </span>
    </div>
  </div>
  <div class="toast toast-top toast-center z-[9999]" v-if="toast">
    <div class=" alert alert-success">
      <span class=" flex">
        <successIcon width="18" class="mr-2" />
        {{ userStore.userName }} 登录成功
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useIcon from "@/assets/icons/use.svg?component";
import rightIcon from "@/assets/icons/right.svg?component";
import userIcon from "@/assets/icons/user.svg?component";
import logoutIcon from "@/assets/icons/logout.svg?component";
import successIcon from "@/assets/icons/success.svg?component";
import themeIcon from "@/assets/icons/theme.svg?component";
import settinIcon from "@/assets/icons/setting.svg?component";
import widthIcon from "@/assets/icons/width.svg?component";
import infoIcon from "@/assets/icons/info.svg?component";

import avatar from "./avatar.vue";
import auth from "./auth.vue";
import modal from "./modal.vue";
import { ref, reactive, computed, watch } from "vue";

import { useUserStore, useSettingStore } from "@/store";
const userStore = useUserStore();
const settingStore = useSettingStore();

let isOpenModal = ref(false);

const tablist = reactive([
  {
    text: "登录",
    active: true,
    form: "login",
  },
  {
    text: "注册",
    active: false,
    form: "register",
  },
]);

const themes = computed(() => settingStore.getTheme());

watch(
  () => settingStore.isFullWidth,
  (value: boolean) => {
    settingStore.setFullWidth(value);
  }
);

function toggleTab(item: any) {
  if (item.active) return;
  tablist.forEach((item) => {
    item.active = false;
  });
  item.active = true;
}

let toast = ref(false);
function loginSuccess() {
  isOpenModal.value = false;
  toast.value = true;
  setTimeout(() => {
    toast.value = false;
  }, 2000);
}

function setTheme(key: string) {
  settingStore.setTheme(key);
}
</script>

<style scoped></style>
