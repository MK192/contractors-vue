<template>
  <section>
    <BaseCard>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <header>
        <h2>Interested? Reach out now!</h2>
        <h4>{{ description }}</h4>
        <BaseButton link :to="contactLink">Contact</BaseButton>
        <RouterView />
      </header>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <BaseBadge v-for="area in areas" :key="area" :type="area" :title="area">
        <p>{{ area }}</p>
      </BaseBadge></BaseCard
    >
  </section>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return { selectedContractor: null };
  },

  created() {
    this.selectedContractor = this.$store.getters[
      "contractors/getContractors"
    ].find((cont) => cont.id === this.id);
  },
  computed: {
    fullName() {
      return (
        this.selectedContractor.firstName +
        " " +
        this.selectedContractor.lastName
      );
    },
    contactLink() {
      console.log(this.$route.path);
      return this.$route.path + "/contact";
    },

    areas() {
      return this.selectedContractor.areas;
    },
    rate() {
      return this.selectedContractor.hourlyRate;
    },
    description() {
      return this.selectedContractor.description;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}
h4 {
  margin: 0.8rem 0;
}
div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
