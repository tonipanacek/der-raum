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
  position: absolute;
  top: 50vh;
  right: 0;
  transform: translateY(-100%);
  .bar {
    background-color: color(light);
    width: spacing(xs);
    height: 25vh;
    max-height: 50rem;
    border-radius: spacing(xs);
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
