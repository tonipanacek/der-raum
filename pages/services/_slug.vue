<template>
  <article class="service">
    <h1>{{ $tp('title') }}</h1>
    <p>{{ $tp('description') }}</p>
    <img :src="$tp('image')" alt="Image of service">
  </article>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug;
      // get current page data
      const page = await import(`~/content/services/${slug}.md`);
      return {
        page,
        slug
      }
    } catch(err) {
      console.debug(err)
      return false
    }
  }
}
</script>
