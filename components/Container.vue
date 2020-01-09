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
  flex-grow: 1;
  flex-shrink: 1;
}
</style>
