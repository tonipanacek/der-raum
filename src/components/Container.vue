<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Container'
}
</script>

<style lang="scss">
  .container{
    max-width: $container-min-width;
    // margin: 0 auto;
    // flex-basis: $container-min-width;
    flex-grow: 1;
    flex-shrink: 1;
  }
</style>
