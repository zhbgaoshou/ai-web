<template>
    <!-- Open the modal using ID.showModal() method -->
    <dialog class="modal modal-bottom md:modal-middle" :class="open ? 'modal-open' : ''">
        <div class="modal-box p-[2rem]">
            <slot></slot>
            <div class="modal-action">
                <form method="dialog">
                    <button @click="close" class="btn btn-sm btn-circle btn-ghost absolute right-1 top-1">✕</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script setup lang="ts">
const open = defineModel('open')

const close = () => {
    open.value = false
}

</script>

<style scoped></style>