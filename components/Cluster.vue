<template>
  <div :class="`cluster ${spacing}`">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Cluster",
  props: {
    spacing: {
      type: String,
      default: "sm"
    }
  }
}
</script>

<style lang="scss">
.cluster {
  overflow: hidden;
  & > * {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin: spacing(sm) / 2 * -1;
    & > * {
      margin: spacing(sm) / 2;
    }
  }
  &.md {
    & > * {
      margin: spacing(md) / 2 * -1;
      & > * {
        margin: spacing(md) / 2;
      }
    }
  }
  &.lg {
    & > * {
      margin: spacing(lg) / 2 * -1;
      & > * {
        margin: spacing(lg) / 2;
      }
    }
  }
  &.v-align\:top > * {
    align-items: normal;
  }
}
</style>
