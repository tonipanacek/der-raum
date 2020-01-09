<template>
  <article class="room">
    <h1>{{ $tp("title") }}</h1>
    <p>{{ $tp("description") }}</p>
    <img :src="$tp('image')" alt="Image of room" />
  </article>
</template>

<script>
import { mapActions } from "vuex"

export default {
  async asyncData({ params }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug
      // get current page data
      const page = await import(`~/content/rooms/${slug}.md`)

      // create context via webpack to map over all pages
      const allPages = await require.context("~/content/rooms/", true, /\.md$/)
      const pages = allPages.keys().map(key => {
        // give back the value of each page context
        return allPages(key)
      })

      return {
        page,
        slug,
        pages
      }
    } catch (err) {
      console.debug(err)
      return false
    }
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("rooms")
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>

<style lang="scss">
.room {
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
