<script setup lang="ts">
import { onMounted, computed } from 'vue'
import CustomButton from './CustomButton.vue'
import { format } from 'date-fns'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(() => {
    if (!userStore.users.length) {
        userStore.fetchUsers()
    }
})

const users = computed(() => userStore.filteredAndSortedUsers)

// const columns = computed(() =>
//     users.value.length > 0 ? Object.keys(users.value[0]) : []
// )

const columns = [
    'date',
    'name',
    'gender',
    'country',
    'email',
]


const sortColumn = (col: string) => {
    if (userStore.sortKey === col) {
        userStore.sortAsc = !userStore.sortAsc
    } else {
        userStore.sortKey = col
        userStore.sortAsc = true
    }
}

const refresh = () => {
    userStore.fetchUsers(userStore.currentPage)
}
</script>

<template>
    <div class="max-w-7xl mx-auto mt-10 px-4 xl:px-0">
        <!-- Search -->
        <input v-model="userStore.searchQuery" placeholder="Search users..."
            class="mb-6 w-full border border-[#4EBBD8] appearance-none px-4 py-2 rounded shadow-sm" />

        <!-- Table Header -->
        <div class="grid grid-cols-5 text-sm capitalize text-gray-400 font-medium mb-4 px-6">
            <div v-for="col in columns" :key="col" @click="sortColumn(col)"
                class="cursor-pointer select-none hover:text-[#4EBBD8] transition-colors">
                {{ col }}
                <span v-if="userStore.sortKey === col">
                    {{ userStore.sortAsc ? '▲' : '▼' }}
                </span>
            </div>
        </div>

        <!-- Scrollable Rows -->
        <div class="max-h-[400px] overflow-y-auto space-y-3">
            <div v-for="(user, index) in users" :key="index"
                class="group grid grid-cols-5 items-center px-6 py-4 rounded cursor-pointer border border-white hover:border hover:border-[#4EBBD8] bg-white shadow/20"
                @click="userStore.selectUser(user)">
                <div class="text-sm text-gray-500">{{ format(user!.date, 'dd MMM yyyy') }}</div>
                <div class="text-sm font-semibold text-gray-700 group-hover:text-[#4EBBD8]">{{ user.name }}</div>
                <div class="text-sm text-gray-500 group-hover:text-gray-700">{{ user.gender }}</div>
                <div class="text-sm text-gray-700">{{ user.country }}</div>
                <div class="text-sm text-gray-500 truncate">{{ user.email }}</div>
            </div>
        </div>

        <!-- Pagination + Refresh -->
        <div class="flex justify-between items-center mt-8 gap-4 flex-wrap">
            <CustomButton @click="userStore.prevPage" title="Prev" type="secondary" />
            <CustomButton @click="refresh" title="Refresh" type="secondary" icon="refresh" />
            <CustomButton @click="userStore.nextPage" title="Next" type="secondary" />
        </div>

        <div class="text-center text-sm text-gray-400 mt-2">
            Page {{ userStore.currentPage }} / {{ userStore.totalPages }}
        </div>

    </div>
</template>
