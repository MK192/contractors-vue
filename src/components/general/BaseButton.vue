<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <RouterLink v-else :to="to" :class="mode">
    <slot></slot>
  </RouterLink>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #d6a606;
  border: 1px solid #d6a606;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #614503;
  border-color: #614503;
}

.flat {
  background-color: transparent;
  color: #d6a606;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #d6a606;
  color: #d6a606;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #413702;
  color: white;
}
</style>
