<template>
  <RouterView />
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "DM Sans", sans-serif;
}

body {
  margin: 0;
  background-color: #d8dce3;
}
</style>
