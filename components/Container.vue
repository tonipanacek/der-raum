<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Container"
}
</script>

<style lang="scss">
.container {
  flex: 2 1 auto;
  min-height: 100%;
  position: relative;
}
</style>
