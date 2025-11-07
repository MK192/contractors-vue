<template>
  <TheHeader />
  <RouterView />
</template>

<script>
import TheHeader from "./components/navigation/TheHeader.vue";
export default {
  name: "App",
  components: { TheHeader },
  created() {
    this.$store.dispatch("auth/tryLogin");
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters["auth/didAutoLogout"];
    },
  },
  watch: {
    didAutoLogout(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.$router.replace("/contractors");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "DM Sans", sans-serif;
  color: white;
}

body {
  margin: 0;
  background-color: #0c0e12;
}
</style>
