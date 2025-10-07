<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
  border: 2px solid #d6a606;

  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
