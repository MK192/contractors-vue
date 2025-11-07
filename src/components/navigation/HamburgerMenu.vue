<template>
  <div class="hamburger" ref="menuWrapper">
    <button class="hamburger-button" @click="hamburgerClicked">&#9776;</button>
    <span>
      <div v-if="isOpen" class="hamburger-menu">
        <ul>
          <li>
            <RouterLink to="/contractors">Contractors </RouterLink>
          </li>
          <li v-if="isLoggedIn">
            <RouterLink to="/requests">Requests </RouterLink>
          </li>
          <li v-else>
            <RouterLink to="/auth">Login</RouterLink>
          </li>
          <li v-if="isLoggedIn">
            <button @click="logout" type="button" class="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  props: ["isOpen"],
  emits: ["hamburgerClicked"],
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
    hamburgerClicked() {
      this.$emit("hamburgerClicked", !this.isOpen);
    },
    handleClickOutside(event) {
      if (!this.$refs.menuWrapper.contains(event.target)) {
        if (this.isOpen) {
          this.$emit("hamburgerClicked", false);
        }
      }
    },
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.hamburger-button {
  padding: 15px;
  font-size: larger;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.66);
  background-color: transparent;
  border: none;
}
.hamburger {
  margin-right: 2rem;
  z-index: 500;
}
.hamburger-menu {
  position: absolute;
  width: 200px;
  height: 150px;
  padding: 10px;
  font-weight: 700;
  background-color: #0c0e12;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.66);
  right: 10px;
}
.hamburger-menu a {
  text-decoration: none;
  color: white;
}
.hamburger-menu ul {
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 10px;
  padding: 0 30px;
}
.logout-button {
  border: none;
  background-color: transparent;
  box-shadow: unset;
  padding: 0;
  font-weight: 700;
  font-size: 1rem;
  color: white;
  cursor: pointer;
}

@media screen and (min-width: 750px) {
  .hamburger {
    display: none;
  }
}
</style>
