<template>
  <div class="switcher">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'switcher'
}
</script>

<style lang="scss">
.switcher{
  $spacing: spacing(sm);

  & /deep/ > * {
    display: flex;
    flex-wrap: wrap;
    margin: ($spacing / 2) * -1;
  }

  & /deep/ > * > * {
    flex-grow: 1;
    flex-basis: calc((#{$measure} - (100% - #{$spacing})) * 999);
    margin: $spacing / 2;
  }

  & /deep/ > * > :nth-last-child(n + 5),
  & /deep/ > * > :nth-last-child(n + 5) ~ * {
    flex-basis: 100%;
  }
}
</style>
