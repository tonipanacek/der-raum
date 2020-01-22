<template>
  <Container id="project">
    <article class="project">
      <h1>{{ $tp("title") }}</h1>
      <p>{{ $tp("description") }}</p>
      <img :src="image" v-for="image in $tp('images')" :alt="$tp('title')" />
    </article>
  </Container>
</template>

<script>
import { mapActions } from 'vuex';
import Container from "~/components/Container"

export default {
  async asyncData({ params }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug
      // get current page data
      const page = await import(`~/content/projects/${slug}.md`)

      // create context via webpack to map over all pages
      const allPages = await require.context(
        "~/content/projects/",
        true,
        /\.md$/
      )
      const pages = allPages.keys().map(key => {
        // give back the value of each page context
        return allPages(key)
      })

      return {
        page,
        pages,
        slug
      }
    } catch (err) {
      console.debug(err)
      return false
    }
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("projects")
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  },
  components: {
    Container
  }
}
</script>
