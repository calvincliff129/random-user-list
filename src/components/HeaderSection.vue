<script setup lang="ts">
import BellIcon from '@/components/icons/BellIcon.vue'
import GearIcon from '@/components/icons/GearIcon.vue'
import LogOutIcon from '@/components/icons/LogOutIcon.vue'
</script>

<template>
    <div class="flex flex-row justify-between items-center max-w-7xl w-full h-12 mx-auto">
        <!-- Logo (scaled to fit header height) -->
        <img alt="Kiratech logo" src="@/assets/Logo.png" class="h-8 w-auto" />

        <!-- Icons -->
        <div class="flex flex-row gap-4">
            <BellIcon class="cursor-pointer hover:scale-110 transition-transform" />
            <GearIcon class="cursor-pointer hover:scale-110 transition-transform" />
            <LogOutIcon class="cursor-pointer hover:scale-110 transition-transform" />
        </div>
    </div>
</template>
