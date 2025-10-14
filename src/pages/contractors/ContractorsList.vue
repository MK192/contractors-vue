<template>
  <section>
    <section><ContractorsFilter @change-filter="changeFilters" /></section>
    <BaseCard>
      <section>
        <div class="controls">
          <BaseButton mode="outline" @click="loadContractors(true)"
            >Refresh</BaseButton
          >
          <BaseButton
            link
            v-if="isLoggedIn && !isContractor && !isLoading"
            to="/registration"
            >Register as Contractor</BaseButton
          >
        </div>
        <ul v-if="contractors?.length > 0">
          <ContractorItem
            v-for="contractor in contractors"
            :key="contractor.id"
            :id="contractor.id"
            :firstName="contractor.firstName"
            :lastName="contractor.lastName"
            :rate="contractor.hourlyRate"
            :areas="contractor.areas"
          />
        </ul>

        <h3 v-else>No Available Contractors</h3>
      </section>
    </BaseCard>
  </section>
  <p v-if="error">Error : {{ error }}</p>
</template>

<script>
import { useQuery } from "@tanstack/vue-query";
import ContractorItem from "./ContractorItem.vue";
import ContractorsFilter from "./ContractorsFilter.vue";

export default {
  components: { ContractorItem, ContractorsFilter },
  data() {
    return {
      data: null,
      isLoading: false,
      error: null,
      activeFilters: { builder: true, electrician: true, plumber: true },
    };
  },
  computed: {
    isLoggedIn() {
      console.log(this.$store.getters["auth/isAuthenticated"]);
      return this.$store.getters["auth/isAuthenticated"];
    },
    isContractor() {
      return this.$store.getters["contractors/isContractor"];
    },
    contractors() {
      const contractors = this.$store.getters["contractors/getContractors"];
      return contractors?.filter((contractor) => {
        if (
          this.activeFilters.builder &&
          contractor.areas.includes("builder")
        ) {
          return true;
        }

        if (
          this.activeFilters.electrician &&
          contractor.areas.includes("electrician")
        ) {
          return true;
        }
        if (
          this.activeFilters.plumber &&
          contractor.areas.includes("plumber")
        ) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    changeFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadContractors(refresh = false) {
      this.isLoading = true;
      try {
        /*forceRefresh is used when Refresh button is clicked
       that means we need to refresh even if last fetch was with less then 1 minute
     */ await this.$store.dispatch("contractors/fetchContractors", {
          forceRefresh: refresh,
        });
        return this.$store.state.contractors.contractors;
      } catch (error) {
        this.error = error.message ?? "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    const { data, isLoading, error } = useQuery({
      queryKey: ["contractors"],
      queryFn: () => this.loadContractors(),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    });
    this.data = data;
    this.isLoading = isLoading;
    this.error = error;
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
h3 {
  text-align: center;
  margin: 3rem 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
