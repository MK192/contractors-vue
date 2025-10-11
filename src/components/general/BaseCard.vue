<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
  /* border: 2px solid #424242; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.66);
  color: #d6a606;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
