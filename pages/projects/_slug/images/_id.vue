<template>
  <div
  id="projects"
  class="image"
  >
    <Container>
      <article class="project">
        <NuxtLink :to="closeLink" v-if="closeLink" class="close-link">
        Close
        </NuxtLink>
        <div class="image-container">
          <img :src="image" :alt="$tp('title')">
        </div>
        <div class="image-footer">
          <aside class="caption">
            <h1>{{ $tp('title') }} {{ id }} / {{ images.length }}</h1>
            <p>{{ $tp('description') }}</p>
          </aside>
          <nav class="image-nav">
            <NuxtLink :to="previousImageLink" v-if="previousImageLink">
            Previous
            </NuxtLink>
            <NuxtLink :to="nextImageLink" v-if="nextImageLink">
            Next
            </NuxtLink>
          </nav>
        </div>
      </article>
    </Container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy, isEmpty, chunk, isEqual } from 'lodash'
import Container from "~/components/Container"

export default {
  name: 'projectsSlug',
  async asyncData({ params, error }) {
    // get the slug as a param to import the correct md file
    try {
      // get current page data
      const slug = params.slug
      const id = parseInt(params.id)
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

      let chunks = chunk(pages, 4 - 1)
      chunks = chunks.map((chunk, index) => {
        const nextChunk = chunks[index + 1] || []
        return [...chunk, nextChunk[0]].filter(c => c)
      })
      pages = chunks.find(chunk =>
        chunk.find(chunkyPage =>
          isEqual(chunkyPage.attributes, page.attributes)
        )
      )

      if (!image) {
        throw "No image found!"
      }

      return {
        image,
        images,
        pages,
        page,
        slug,
        chunks,
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
  computed: {
    nextImageLink() {
      if (this.id >= this.$data.images.length) { return '' }
      return `/projects/${this.$data.slug}/images/${this.$data.id + 1}`
    },
    previousImageLink() {
      if (this.id <= 1) { return '' }
      return `/projects/${this.$data.slug}/images/${this.$data.id - 1}`
    },
    closeLink() {
      return `/projects/${this.$data.slug}/`
    }
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
  max-height: calc(100vh - 4 * #{spacing(lg)});
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
.image-footer {
  display: flex;
  .caption {
    flex-grow: 2;
  }
}
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-link {
  position: fixed;
  left: spacing(lg) * 5;
}
</style>
