<script setup lang="ts">
import HeaderSection from './components/HeaderSection.vue'
import ProfileSection from './components/ProfileSection.vue'
import CustomTable from './components/CustomTable.vue'
import ModalView from './components/ModalView.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

</script>

<template>
  <header>
    <HeaderSection />
  </header>

  <main>
    <ProfileSection />
    <CustomTable />
  </main>

  <!-- Modal view for selected user -->
  <ModalView v-if="userStore.selectedUser" :user="userStore.selectedUser" @close="userStore.clearSelectedUser()" />
</template>
