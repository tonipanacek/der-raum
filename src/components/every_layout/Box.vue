<template>
  <div class="`box ${spacing}`">
    <slot/>
  </div>
</template>

<script>
import spacingProp from './helpers/spacing_prop';

export default {
  name: 'l-box',
  props: {
    invert: {
      type: Boolean,
      default: false
    },
    ...spacingProp
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: spacing(sm);
  color: color(dark);
  background-color: color(background);

  & /deep/ * {
    color: inherit;
  }
}

.invert {
  color: color(background);
  background-color: color(dark);
}

@each $name, $spacing in $spacings {
  .#{$name} {
    padding: $spacing;
  }
}
</style>
