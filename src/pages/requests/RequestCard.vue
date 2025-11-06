<template>
  <div class="req-container">
    <div class="req-header">
      <h2>Received Requests</h2>
    </div>

    <div class="req-content">
      <ul>
        <li>
          <p class="">Sent from</p>
          <p>{{ request.email }}</p>
        </li>

        <li>
          <p>Message</p>
          <p>{{ request.message }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["request"],
};
</script>

<style scoped>
.req-container {
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  padding: 1rem;
  margin: 2rem auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.66);
}

.req-header {
  padding: 0 2rem;
}

ul {
  list-style: none;
}
p:nth-of-type(1),
p:nth-of-type(3) {
  text-decoration: underline;
  font-size: 1rem;
  font-weight: 800;
}
</style>
