<script setup lang="ts">
import { ref } from 'vue'
import CustomButton from './CustomButton.vue'

const userName = ref('John Doe')
const onlineStatus = ref('Last online: 2 days ago')
</script>

<template>
    <div class="relative flex justify-center items-end bg-[#4EBBD8] px-4 xl:px-0 gap-2 py-4 md:py-2 min-h-36 h-fit text-white">
        <div
            class="flex flex-col md:flex-row items-center md:items-center justify-start gap-4 w-full max-w-7xl h-full md:-mb-8">
            <img alt="Kiratech logo" class="rounded w-32 h-32" src="@/assets/Avatar.png" />

            <div class="flex flex-col md:flex-row justify-end items-center gap-6 h-full">
                <div class="flex flex-col text-center md:text-start">
                    <h2 class="text-3xl font-bold">{{ userName }}</h2>
                    <p class="text-xs font-light">{{ onlineStatus }}</p>
                </div>

                <div class="flex flex-row gap-2 mt-2">
                    <CustomButton title="Send Message" type="primary" icon="share" />
                    <CustomButton title="Add Friend" type="secondary" icon="plus" />
                </div>
            </div>
        </div>
    </div>
</template>
