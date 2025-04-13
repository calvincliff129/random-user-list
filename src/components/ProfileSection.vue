<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import CustomButton from './CustomButton.vue'
import { formatDistanceToNow } from 'date-fns'
import defaultAvatar from '@/assets/Avatar.png'
const userStore = useUserStore()

const selectedUser = computed(() => userStore.selectedUser)

// default profile
const activeUser = ref({
  name: 'John Doe',
  status: 'Last online: N/A',
  image: defaultAvatar
})

// dummy online status using the registered date because the api doesnt provides the value
const onlineStatus = computed(() => {
  const date = selectedUser.value?.lastOnline ?? selectedUser.value?.date
  return date
    ? `Last online: ${formatDistanceToNow(new Date(date), { addSuffix: true })}`
    : 'Last online: N/A'
})

// Watch for user selection and update local state
watch(
  () => userStore.selectedUser,
  async (newUser) => {
    if (newUser) {
      activeUser.value = {
        name: newUser.name,
        status: onlineStatus.value,
        image: newUser.picture
      }
    }
  }
)
</script>

<template>
  <div
    class="relative flex justify-center items-end bg-[#4EBBD8] px-4 xl:px-0 gap-2 py-4 md:py-2 min-h-36 h-fit text-white">
    <div
      class="flex flex-col md:flex-row items-center md:items-center justify-start gap-4 w-full max-w-7xl h-full md:-mb-8">
      <!-- User Avatar -->
      <img :src="activeUser.image" alt="User avatar" class="rounded-xl w-32 h-32 border-4 border-white" />

      <!-- User Info -->
      <div class="flex flex-col md:flex-row justify-end items-center gap-6 h-full">
        <div class="flex flex-col text-center md:text-start max-w-xs lg:max-w-lg">
          <h2 class="text-3xl font-bold truncate">{{ activeUser.name }}</h2>
          <p class="text-xs font-light">{{ activeUser.status }}</p>
        </div>

        <!-- Buttons -->
        <div class="flex flex-row gap-2 mt-2">
          <CustomButton title="Send Message" type="primary" icon="share" />
          <CustomButton title="Add Friend" type="secondary" icon="plus" />
        </div>
      </div>
    </div>
  </div>
</template>
