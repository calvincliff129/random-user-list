import type { User } from "@/models/UserModel";
import UserService from "@/services/UserService";
import { format } from "date-fns";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const users = ref<User[]>([]);
  const selectedUser = ref<User | null>(null);
  const isLoading = ref(false);

  const searchQuery = ref("");
  const sortKey = ref<keyof User | string | "">("");
  const sortAsc = ref(true);

  const currentPage = ref(1);
  const totalPages = ref(50); // For visual pagination, even if RandomUser API is random

  // Fetches user data from the RandomUser API based on the specified page
  const fetchUsers = async (page = 1) => {
    isLoading.value = true;
    
    try {
      const data = await UserService.getRandomUserList(page);

      // Transforms API response into an array of User objects
      users.value = data.results.map((user: any) => ({
        name: `${user.name.first} ${user.name.last}`,
        gender: user.gender,
        country: user.location.country,
        email: user.email,
        date: new Date(user.registered.date).toISOString(),
        status: user.status,
        picture: user.picture.large,
      }));
    } catch (e) {
      console.error("Error fetching users:", e);
    } finally {
      isLoading.value = false;
    }
  };

  // Sets the selected user to the provided User object for popup viewing
  const selectUser = (user: User) => (selectedUser.value = user);
  // Clears the selected user, also for closing popup
  const clearSelectedUser = () => (selectedUser.value = null);

  // Computes a filtered and sorted list of users based on search and sort criteria
  const filteredAndSortedUsers = computed(() => {
    let filtered = users.value;

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          format(u.date, "dd MMM yyyy").toString().toLowerCase().includes(query) ||
          u.name.toLowerCase().includes(query) ||
          u.gender.toLowerCase().includes(query) ||
          u.country.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
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

  // Pagination functions and fetches new users
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
