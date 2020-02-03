<template>
  <Container>
    <div
    id="project-images-desktop"
    class="project-images"
    v-on:wheel.prevent="handleScroll"
    >
      <article class="project">
        <h1 class="accessible">{{ $tp("title") }}</h1>
        <vue-markdown class="accessible">{{ $tp("description") }}</vue-markdown>
        <div v-if="isChunky" class="images section">
          <ImagesList
          id="desktop-view"
          :images="currentImages"
          :allImages="images"
          :title="$tp('title')"
          :totalCount="$tp('images').length"
          :page="pageNumber"
          :slug="slug"
          :going-up="goingUp"
          />
        </div>
      </article>
      <ProgressBar :total="pagesChunks.length - 1" :page="pageNumber" v-if="isChunky" />
    </div>
    <div
    id="project-images-mobile"
    class="project-images"
    >
      <article class="project">
        <h1 class="accessible">{{ $tp("title") }}</h1>
        <vue-markdown class="accessible">{{ $tp("description") }}</vue-markdown>
        <div v-if="isChunky" class="images section">
          <ImagesList
          id="mobile-view"
          :images="currentImages"
          :allImages="images"
          :title="$tp('title')"
          :totalCount="$tp('images').length"
          :page="pageNumber"
          :slug="slug"
          :going-up="goingUp"
          />
        </div>
      </article>
      <!-- <ProgressBar :total="pagesChunks.length - 1" :page="pageNumber" v-if="isChunky" /> -->
  </div>
  </Container>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy, isEmpty, chunk, isEqual } from 'lodash'
import paginate from '~/plugins/paginate'
import Container from "~/components/Container"
import Frame from "~/components/Frame"
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
    this.setPages(this.allPagesCurrentChunk)
    this.setPagesPrefix("projects")
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  },
  computed: {
    currentImages() {
      if (isEmpty(this.currentChunk)) { return [] }
      const mappedImages = this.currentChunk.map((url) => {
        return {
          index: this.currentChunk.indexOf(url) + 1,
          url
        }
      })
    return mappedImages
    },
    images() {
      if (isEmpty(this.$data.pages)) { return [] }
      return this.$data.pages
    },
    allPagesChunks() {
      if (isEmpty(this.$data.allPages)) { return [] }
      const allPages = sortBy(this.$data.allPages, [p => get(p, 'attributes.page'), p => get(p, 'attributes.page_position')])
      const chunks = chunk(allPages, 3)
      return chunks.map(chunk => [chunk[1], chunk[0], chunk[2]])
    },
    allPagesCurrentChunk() {
      if (isEmpty(this.allPagesChunks)) { return [] }
      const chunk = this.allPagesChunks[get(this.$data.page, 'attributes.page', 1) - 1] || []
      return chunk.slice(0, 3)
    },
  },
  components: {
    Container,
    ProgressBar,
    ImagesList,
    Frame
  }
}
</script>

<style lang="scss" scoped>
.project {
  display: flex;
  flex-direction: column;
}
.accessible {
  visibility: hidden;
  position: absolute;
}
#mobile-view {
  display: block;
  overflow: visible;
}
#desktop-view {
  display: none;
}
@include respond-to('large') {
  #mobile-view {
    display: none;
  }
  #desktop-view {
    display: block;
  }
}
</style>
