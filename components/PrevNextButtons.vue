<template>
  <nav id="prev-next-buttons">
    <NuxtLink v-if="next" :to="next" class="next link"><img src="~/assets/images/arrow.svg" alt="Next"></NuxtLink>
    <NuxtLink v-if="prev" :to="prev" class="prev link"><img src="~/assets/images/arrow.svg" alt="Previous"></NuxtLink>
  </nav>
</template>

<script>
export default {
  name: 'PrevNextButtons',
  props: {
    next: String,
    prev: String
  }
}
</script>

<style scoped lang="scss">
nav {
  z-index: z(sidebar);
}
img {
  z-index: z(sidebar);
  height: 3rem;
}
</style>
