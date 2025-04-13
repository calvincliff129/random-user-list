<script setup lang="ts">
import { format } from 'date-fns'

defineProps<{
    user: {
        name: string
        gender: string
        country: string
        email: string
        date: Date
        status: string
    } | null
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()
</script>

<template>
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
        <!-- Modal Content -->
        <div class="bg-white shadow rounded-lg p-6 w-full max-w-md relative">
            <!-- Close Button -->
            <button @click="emit('close')" class="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-gray-600 text-xl">
                &times;
            </button>

            <!-- User Name -->
            <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ user?.name }}</h2>

            <!-- Details -->
            <div class="space-y-3 text-sm">
                <div class="flex justify-between text-gray-500">
                    <span>Date:</span>
                    <span class="text-gray-800">{{ format(user!.date, 'dd MMM yyyy') }}</span>
                </div>
                <div class="flex justify-between text-gray-500">
                    <span>Status:</span>
                    <span class="text-gray-800">{{ user?.status }}</span>
                </div>
                <div class="flex justify-between text-gray-500">
                    <span>Gender:</span>
                    <span class="text-gray-800">{{ user?.gender }}</span>
                </div>
                <div class="flex justify-between text-gray-500">
                    <span>Country:</span>
                    <span class="text-gray-800">{{ user?.country }}</span>
                </div>
                <div class="flex justify-between text-gray-500">
                    <span>Email:</span>
                    <span class="text-gray-800">{{ user?.email }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
