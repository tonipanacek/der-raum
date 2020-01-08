<template>
  <div class="full-main">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Standard'
}
</script>

<style lang="scss">
  .full-main {
    img, p {
      max-width: 110ch;
    }
    p {
      line-height: 2rem;
    }
    img {
      object-fit: cover;
      max-height: 70vh;
      width: 110ch;
    }
  }
</style>
