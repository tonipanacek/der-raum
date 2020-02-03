<template>
  <nav id="prev-next-buttons">
    <NuxtLink v-if="next" :to="next" class="next"><Arrow class="arrow" /></NuxtLink>
    <NuxtLink v-if="prev" :to="prev" class="prev"><Arrow class="arrow" /></NuxtLink>
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

<style scoped lang="scss">
nav {
  z-index: z(sidebar);
  position: relative;
  height: 100%;
  width: 100%;
  @include respond-to(large) {
    display: none !important;
  }
}
a {
  .arrow {
    z-index: z(sidebar);
    height: 2rem;
    width: 2rem;
    filter: brightness(100%);
    g {
      box-shadow: shadow(light);
      transition: box-shadow 500ms ease;
    }
    fill: color(white);
  }
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: spacing(xs);
  background-color: rgba(255, 255, 255, 0.3);
  max-width: 3rem;
  transition: background-color 500ms ease, box-shadow 500ms ease;
  &:hover {
    box-shadow: shadow(dark);
    background-color: rgba(255, 255, 255, 0.5);
  }
  &:first-child {
    padding-right: spacing(sm);
  }
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
</style>
