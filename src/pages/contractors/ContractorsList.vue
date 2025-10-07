<template>
  <section>
    <BaseCard>
      <section>
        <div class="controls">
          <BaseButton mode="outline">Refresh</BaseButton>
          <BaseButton link>Register as Coach</BaseButton>
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
        <h3 v-else>No available coaches</h3>
      </section>
    </BaseCard>
  </section>
</template>

<script>
import ContractorItem from "./ContractorItem.vue";

export default {
  components: { ContractorItem },
  computed: {
    contractors() {
      return this.$store.getters["contractors/getContractors"];
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
