<template>
  <nav id="prev-next-buttons">
    <NuxtLink v-if="prev" :to="prev" class="prev"><Arrow class="arrow" /></NuxtLink>
    <NuxtLink v-if="next" :to="next" class="next"><Arrow class="arrow" /></NuxtLink>
  </nav>
</template>

<script>
import Arrow from '~/assets/images/arrow.svg'

export default {
  name: 'PrevNextButtons',
  props: {
    next: String,
    prev: String
  },
  components: {
    Arrow
  }
}
</script>

<style lang="scss">
#prev-next-buttons {
  z-index: z(sidebar);
  // position: relative;
  height: 90%;
  width: 100%;
  @include respond-to(large) {
    display: none;
  }
  a,
  a:visited,
  a:focus {
    .arrow {
      z-index: z(sidebar);
      height: 2rem;
      width: 2rem;
      fill: color(dark);
      @include respond-to(large) {
        opacity: 0;
      }
    }
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    height: 100%;
    opacity: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50vw;
  }
  .prev {
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(-1)
  }
  .next {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
