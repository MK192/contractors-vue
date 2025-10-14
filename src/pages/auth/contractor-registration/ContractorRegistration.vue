<template>
  <section>
    <BaseCard>
      <h2>Contractor Registration</h2>
      <ContractorForm @submit-data="saveData" />
    </BaseCard>
  </section>
</template>
<script>
import ContractorForm from "./ContractorForm.vue";

export default {
  components: { ContractorForm },

  methods: {
    saveData(formData) {
      this.$store.dispatch("contractors/registerContractor", formData);
      this.$router.replace("/contractors");
    },
  },
};
</script>
