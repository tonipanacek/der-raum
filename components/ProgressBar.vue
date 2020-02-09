<template>
  <div class="progress-bar" :style="{ '--total': total + 1, '--page': page + 1 }">
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
  }
}
</script>

<style lang="scss">
.progress-bar {
  z-index: 5;
  --width: #{spacing(xs) / 2};
  display: none;
  @include respond-to(large) {
    display: none;
    @include respond-to-vertical(vertical) {
      display: block;
    }
  }
  position: absolute;
  top: 55vh;
  right: -1.5rem;
  transform: translateY(-100%) translateX(50%);
  .bar {
    background-color: color(light);
    width: var(--width);
    height: 25vh;
    max-height: 50rem;
    border-radius: var(--width);
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
