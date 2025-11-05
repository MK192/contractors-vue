<template>Request List</template>

<script>
import { useQuery } from "@tanstack/vue-query";
export default {
  data() {
    return {
      requests: null,
      isLoading: false,
      error: null,
    };
  },

  methods: {
    async getUsersRequests() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("requests/fetchRequests");

        return this.$store.state.requests.requests;
      } catch (error) {
        this.error = error.message ?? "Something went wrong!";
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    const userId = this.$store.getters["auth/getUserId"];
    const { data, isLoading, error } = useQuery({
      queryKey: ["requests", userId],
      queryFn: () => this.getUsersRequests(),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: Infinity,
      cacheTime: Infinity,
    });
    this.data = data;
    this.isLoading = isLoading;
    this.error = error;
  },
};
</script>
