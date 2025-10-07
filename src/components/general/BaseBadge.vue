<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    text() {
      return this.title?.toUpperCase();
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.electrician {
  border: 1px solid #e35a0b;
  background-color: transparent;
  color: #e35a0b;
}

.builder {
  border: 1px solid #066301;
  background-color: transparent;
  color: #066301;
}

.plumber {
  border: 1px solid #0f91db;
  background-color: transparent;
  color: #0f91db;
}
</style>
