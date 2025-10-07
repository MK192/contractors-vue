<template>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">Refresh</BaseButton>
        <BaseButton link>Register as Coach</BaseButton>
      </div>

      <ul>
        <li v-for="contractor in contractors" :key="contractor.id">
          {{ contractor.firstName }}
        </li>
      </ul>
      <!-- <h3 v-else>No available coaches</h3> -->
    </BaseCard>
  </section>
</template>

<script>
export default {
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
