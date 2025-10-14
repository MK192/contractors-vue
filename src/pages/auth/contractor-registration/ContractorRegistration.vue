<template>
  <section>
    <BaseCard>
      <h2>{{ this.edit ? "Edit" : "Registration" }}</h2>
      <ContractorForm @submit-data="saveData" :edit="edit" />
    </BaseCard>
  </section>
</template>
<script>
import ContractorForm from "./ContractorForm.vue";

export default {
  components: { ContractorForm },
  props: ["edit"],

  methods: {
    async saveData(formData) {
      if (this.edit) {
        await this.$store.dispatch("contractors/editContractor", formData);
      } else {
        await this.$store.dispatch("contractors/registerContractor", formData);
      }
      await this.$store.dispatch("contractors/fetchContractors");
      this.$router.replace("/contractors");
    },
  },
};
</script>
