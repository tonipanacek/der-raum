<template>
  <div
  id="projects"
  class="image"
  >
    <Container>
      <article class="project">
        <img :src="image" :alt="$tp('title')">
        <aside class="caption">
          <h1>{{ $tp('title') }} {{ id }} / {{ images.length }}</h1>
          <p>{{ $tp('description') }}</p>
        </aside>
      </article>
    </Container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy, isEmpty } from 'lodash'
import Container from "~/components/Container"

export default {
  name: 'projectsSlug',
  async asyncData({ params, error }) {
    // get the slug as a param to import the correct md file
    try {
      // get current page data
      const slug = params.slug
      const id = params.id
      const page = await import(`~/content/projects/${slug}.md`)
      const images = get(page, 'attributes.images', [])
      const image = images[id - 1]

      // create context via webpack to map over all pages
      let pages = await require.context(
        "~/content/projects/",
        true,
        /\.md$/
      )
      pages = pages.keys().map(key => {
        // give back the value of each page context
        return pages(key)
      })
      pages = sortBy(pages, page => page.position)

      return {
        image,
        images,
        pages,
        page,
        slug,
        id
      }
    } catch (err) {
      console.debug(err)
      error({ statusCode: 404, message: "No image found" })
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

<style lang="scss" scoped>
.image {
  display: flex;
  flex-direction: column;
  height: 100%;
}
img {
  max-width: 100%;
  max-height: 90vh;
}
* {
  max-width: none;
}
h1 {
  @include smallCaps;
  color: color(dark);
}
p {
  @include smallCaps;
  color: color(light);
  font-size: 0.7em;
}
</style>
