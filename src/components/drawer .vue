<template>
    <div class="drawer md:drawer-open h-full">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col min-h-0">
            <!-- Navbar -->
            <Header />
            <!-- Page content here -->
            <router-view></router-view>
        </div>
        <div class="drawer-side">
            <DrawerSide />
        </div>
    </div>
</template>

<script setup lang="ts">
import DrawerSide from './drawer-side.vue';
import Header from './header.vue';


</script>

<style scoped></style>