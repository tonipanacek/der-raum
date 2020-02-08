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
          :allImages="sortedImages"
          :title="$tp('title')"
          :totalCount="$tp('images').length"
          :page="pageNumber"
          :slug="slug"
          :going-up="goingUp"
          :mobile="false"
          @increment="incrementPage"
          />
        </div>
      </article>
      <ProgressBar :total="pagesChunks.length - 1" :page="pageNumber" v-if="isChunky" @increment="incrementPage" @decrement="decrementPage" />
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
          :images="allImages"
          :allImages="images"
          :title="$tp('title')"
          :totalCount="$tp('images').length"
          :page="pageNumber"
          :slug="slug"
          :going-up="goingUp"
          :mobile="true"
          />
        </div>
      </article>
      <!-- <ProgressBar :total="pagesChunks.length - 1" :page="pageNumber" v-if="isChunky" /> -->
  </div>
  </Container>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy, isEmpty, chunk, isEqual, flatten, uniq, kebabCase } from 'lodash'
import paginate from '~/plugins/paginate'
import Container from "~/components/Container"
import Frame from "~/components/Frame"
import ProgressBar from "~/components/ProgressBar"
import ImagesList from "~/components/ImagesList"

export default {
  name: 'projectsSlug',
  nuxtI18n: {
    paths: {
      de: '/projekte/:slug',
      en: '/projects/:slug'
    }
  },
  mixins: [paginate],
  async asyncData({ app, params, error, store }) {
    // get the slug as a param to import the correct md file
    try {
      // get current page data
      const slug = params.slug

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

      const locale = app.i18n.locale
      const page = allPages.find(p => kebabCase(get(p, `attributes.${locale}_title`)) === slug)

      await store.dispatch('i18n/setRouteParams', {
        en: { slug: kebabCase(get(page, `attributes.en_title`)) },
        de: { slug: kebabCase(get(page, `attributes.de_title`)) }
      })

      const images = get(page, 'attributes.images', [])

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
      if (this.pageNumber === 0) {
        const mappedImages = this.currentChunk.map((url) => {
        return {
          index: this.currentChunk.indexOf(url) + 1,
          url
          }
        })
        return mappedImages
      } else {
        let current = this.currentChunk
        current = [current[1], current[0], current[2], current[3]].filter(i => i)
        if (current.length === 1) {
          current.splice(0, 0, '')
          const switchedImages = current.map((url) => {
            return {
              index: this.currentChunk.indexOf(url) + 1 || -1,
              url
            }
          })
          return switchedImages
        } else {
          const switchedImages = current.map((url) => {
            return {
              index: current.indexOf(url) + 1,
              url
            }
          })
          return switchedImages
        }
      }
    },
    allImages() {
      if (isEmpty(this.images)) { return [] }
      return this.images.map((url) => {
        return {
          index: this.images.indexOf(url) + 1,
          url
        }
      })
    },
    sortedImages() {
      return uniq(flatten(this.pagesChunks))
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
      let chunk = this.allPagesChunks[get(this.$data.page, 'attributes.page', 1) - 1] || []
      chunk = chunk.slice(0, 3)
      return [chunk[1], chunk[0], chunk[2]].filter(p => p)
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
  height: 0;
  width: 0;
  overflow: hidden;
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
