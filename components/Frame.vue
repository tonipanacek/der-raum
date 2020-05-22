<template>
  <div class="frame" :style="{'--n': n, '--d': d, 'background-image': 'url(' + source + ')'}">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Frame',
  props: {
    n: {
      type: Number,
      default: 9
    },
    d: {
      type: Number,
      default: 16
    },
    source: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.frame {
  // padding-bottom: calc(var(--n) / var(--d) * 100%);
  padding-bottom: calc(9 / 16 * 100%);
  position: relative;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-position: center;
  & /deep/ > * {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & /deep/ > img,
  & /deep/ > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
