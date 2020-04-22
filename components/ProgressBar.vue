<template>
  <div class="progress-bar" :style="cssVars">
    <div class="bar">
      <div class="up" @click="$emit('decrement')"></div>
      <div class="completed"></div>
      <div class="down" @click="$emit('increment')"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    total: Number,
    page: Number
  },
  computed: {
    cssVars() {
      return {
        '--total': this.total + 1,
        '--page': this.page + 1
      }
    }
  }
}
</script>

<style lang="scss">
// :root {
//   --total: 1;
//   --page: 1;
//   --width: .25rem;
// }

.progress-bar {
  z-index: 5;
  width: .25rem;
  display: none;
  @include respond-to(large) {
    display: none;
    @include respond-to-vertical(vertical) {
      display: block;
    }
  }
  position: absolute;
  top: 55vh;
  right: 39px;
  transform: translateY(-100%) translateX(50%);
  .bar {
    background-color: color(light);
    width: .25rem;
    height: 25vh;
    max-height: 50rem;
    border-radius: .25rem;
    position: relative;
    overflow: hidden;
    .up {
      position: absolute;
      top: 0;
      left: 0;
      height: calc((var(--page) - 1) / var(--total) * 100%);
      width: 100%;
      cursor: pointer;
    }
    .completed {
      transition: top 750ms ease, height 750ms ease;
      position: absolute;
      top: calc((var(--page) - 1) / var(--total) * 100%);
      left: 0;
      background-color: color(dark);
      height: calc(1 / var(--total) * 100%);
      width: 100%;
      border-radius: inherit;
    }
    .down {
      position: absolute;
      bottom: 0;
      left: 0;
      height: calc((var(--total) - var(--page)) / var(--total) * 100%);
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>
