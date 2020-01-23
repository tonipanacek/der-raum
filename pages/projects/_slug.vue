<template>
  <div
  id="projects"
  class="projects"
  v-on:wheel.prevent="handleScroll"
  >
    <Container>
      <article class="project">
        <h1 class="accessible">{{ $tp("title") }}</h1>
        <vue-markdown class="accessible">{{ $tp("description") }}</vue-markdown>
        <div v-if="isChunky" class="images section">
          <ImagesList
          :images="currentImages"
          :title="$tp('title')"
          :totalCount="$tp('images').length"
          />
        </div>
      </article>
      <ProgressBar :total="pagesChunks.length - 1" :page="pageNumber" v-if="isChunky" />
    </Container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy, isEmpty } from 'lodash'
import paginate from '~/plugins/paginate'
import Container from "~/components/Container"
import ProgressBar from "~/components/ProgressBar"
import ImagesList from "~/components/ImagesList"

export default {
  name: 'projectsSlug',
  mixins: [paginate],
  async asyncData({ params, error }) {
    // get the slug as a param to import the correct md file
    try {
      // get current page data
      const slug = params.slug
      const page = await import(`~/content/projects/${slug}.md`)
      const images = get(page, 'attributes.images', [])

      // create context via webpack to map over all pages
      let allPages = await require.context(
        "~/content/projects/",
        true,
        /\.md$/
      )
      allPages = allPages.keys().map(key => {
        // give back the value of each page context
        return allPages(key)
      })
      allPages = sortBy(allPages, page => page.position)

      return {
        pages: images, // For paginate mixin, must be named as such :)
        allPages,
        page,
        slug
      }
    } catch (err) {
      error({ statusCode: 404, message: "No project found" })
    }
  },
  mounted() {
    this.setPages(this.$data.allPages)
    this.setPagesPrefix("projects")
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  },
  computed: {
    currentImages() {
      if (isEmpty(this.currentChunk)) { return [] }
      return this.currentChunk.map((url) => {
        return {
          index: this.images.indexOf(url) + 1,
          url
        }
      })
    },
    images() {
      if (isEmpty(this.$data.pages)) { return [] }
      return this.$data.pages
    }
  },
  components: {
    Container,
    ProgressBar,
    ImagesList
  }
}
</script>

<style lang="scss" scoped>
.project {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.section {
  min-height: 100%;
}
.accessible {
  visibility: hidden;
  position: absolute;
}
</style>
