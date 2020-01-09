<template>
  <article class="about">
    <h1>{{ $tp("title") }}</h1>
    <p>{{ $tp("description") }}</p>
    <img :src="$tp('image')" alt="Image corresponding to about page" />
  </article>
</template>

<script>
export default {
  async asyncData({ params }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug
      // get current page data
      const page = await import(`~/content/about/${slug}.md`)
      return {
        page,
        slug
      }
    } catch (err) {
      console.debug(err)
      return false
    }
  }
}
</script>

<style lang="scss">
.about {
  max-width: 110ch;
  img,
  p {
    max-width: 110ch;
  }
  p {
    line-height: 2rem;
    color: color(light);
  }
  img {
    object-fit: cover;
    max-height: 70vh;
    width: 110ch;
  }
  h1 {
    @include smallCaps;
    color: color(dark);
  }
  &-text {
    display: inline-block;
  }
}
</style>
