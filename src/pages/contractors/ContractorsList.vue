<template>
  <section>
    <section><ContractorsFilter @change-filter="changeFilters" /></section>
    <BaseCard>
      <section>
        <div class="controls">
          <BaseButton mode="outline">Refresh</BaseButton>
          <BaseButton link>Register as Contractor</BaseButton>
        </div>
        <ul v-if="contractors">
          <ContractorItem
            v-for="coach in contractors"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          />
        </ul>
        <h3 v-else>No available contractors</h3>
      </section>
    </BaseCard>
  </section>
</template>

<script>
import ContractorItem from "./ContractorItem.vue";
import ContractorsFilter from "./ContractorsFilter.vue";

export default {
  components: { ContractorItem, ContractorsFilter },
  data() {
    return {
      activeFilters: { builder: true, electrician: true, plumber: true },
    };
  },
  computed: {
    contractors() {
      const contractors = this.$store.getters["contractors/getContractors"];
      return contractors.filter((contractor) => {
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
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
