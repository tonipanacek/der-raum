<template>
  <div class="progress-bar" :style="{ '--total': total + 1, '--page': page + 1 }">
    <div class="bar">
      <div class="completed"></div>
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
  --width: #{spacing(xs) / 2};
  position: fixed;
  top: 50vh;
  right: spacing(lg);
  transform: translateY(-100%) translateX(50%);
  .bar {
    background-color: color(light);
    width: var(--width);
    height: 25vh;
    max-height: 50rem;
    border-radius: var(--width);
    position: relative;
    overflow: hidden;
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
  }
}
</style>
