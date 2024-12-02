<template>
    <div class="navbar-start">
        <label for="my-drawer-3" aria-label="open sidebar" class="mr-1 md:hidden btn btn-square btn-sm btn-ghost">
            <moreIcon width="24" />
        </label>
        <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-sm btn-ghost">GPT 4o
                <downIcon />
            </div>
            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a>GPT 4o</a></li>
                <li><a>GPT 3.5</a></li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import moreIcon from '@/assets/icons/more.svg?component'
import downIcon from '@/assets/icons/down.svg?component'


</script>

<style scoped></style>