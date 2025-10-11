<template>
  <header>
    <nav>
      <h1>
        <RouterLink to="/"> Contractor App </RouterLink>
      </h1>
    </nav>
    <ul>
      <li>
        <RouterLink to="/contractors">Contractors List </RouterLink>
      </li>
      <li v-if="isLoggedIn">
        <RouterLink to="/requests">Requests </RouterLink>
      </li>
      <li v-else>
        <RouterLink to="/auth">Login</RouterLink>
      </li>
      <li v-if="isLoggedIn">
        <BaseButton @click="logout">Logout</BaseButton>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.replace("/contractors");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #0f1012;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #424242;
}

header a {
  text-decoration: none;
  text-wrap: nowrap;
  color: white;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid white;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
