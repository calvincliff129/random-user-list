import { defineStore } from "pinia";
import { ref, computed } from "vue";

export type User = {
  name: string;
  gender: string;
  country: string;
  email: string;
  date: Date;
  status: string;
};

export const useUserStore = defineStore("userStore", () => {
  const users = ref<User[]>([]);
  const selectedUser = ref<User | null>(null);
  const isLoading = ref(false);

  const searchQuery = ref("");
  const sortKey = ref<keyof User | "">("");
  const sortAsc = ref(true);

  const currentPage = ref(1);
  const totalPages = ref(50); // For visual pagination, even if RandomUser API is random

  const fetchUsers = async (page = 1) => {
    isLoading.value = true;
    try {
      const res = await fetch(`https://randomuser.me/api/?page=${page}&results=20`);
      const data = await res.json();

      users.value = data.results.map((user: any) => ({
        name: `${user.name.first} ${user.name.last}`,
        gender: user.gender,
        country: user.location.country,
        email: user.email,
        date: new Date().toISOString(),
        status: user.status,
      }));
    } catch (e) {
      console.error("Error fetching users:", e);
    } finally {
      isLoading.value = false;
    }
  };

  const selectUser = (user: User) => (selectedUser.value = user);
  const clearSelectedUser = () => (selectedUser.value = null);

  const filteredAndSortedUsers = computed(() => {
    let filtered = users.value;

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          u.country.toLowerCase().includes(query)
      );
    }

    if (sortKey.value) {
      filtered = [...filtered].sort((a, b) => {
        const valA = a[sortKey.value];
        const valB = b[sortKey.value];
        if (valA < valB) return sortAsc.value ? -1 : 1;
        if (valA > valB) return sortAsc.value ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  });

  const nextPage = () => {
    currentPage.value++;
    fetchUsers(currentPage.value);
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchUsers(currentPage.value);
    }
  };

  return {
    users,
    selectedUser,
    isLoading,
    searchQuery,
    sortKey,
    sortAsc,
    currentPage,
    totalPages,
    filteredAndSortedUsers,
    fetchUsers,
    nextPage,
    prevPage,
    selectUser,
    clearSelectedUser,
  };
});
