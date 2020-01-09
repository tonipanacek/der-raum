<template>
  <article class="project">
    <h1>{{ $tp('title') }}</h1>
    <p>{{ $tp('description') }}</p>
    <img :src="$tp('image')" alt="Image of project">
  </article>
</template>

<script>
export default {
  async asyncData({ params }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug;
      // get current page data
      const page = await import(`~/content/projects/${slug}.md`);
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
