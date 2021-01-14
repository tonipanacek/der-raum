<template>
  <Container>
    <h1 class="accessible">{{ $tp("title") }}</h1>
    <vue-markdown class="accessible">{{ $tp("description") }}</vue-markdown>
    <div
    id="project-images-mobile"
    class="project-images"
    >
      <article class="project">
        <div v-if="isChunky" class="images section">
          <ImagesList
          id="mobile-view"
          :images="sortedWithUrls"
          :sortedImages="sortedImages"
          :title="$tp('title')"
          :totalCount="sortedImages.length"
          :page="pageNumber"
          :slug="slug"
          :going-up="goingUp"
          :mobile="true"
          />
        </div>
      </article>
    </div>
  </Container>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy, isEmpty, chunk, isEqual, flatten, uniq, kebabCase } from 'lodash'
import paginate from '~/plugins/paginate'
import dynamicSEO from '~/plugins/dynamic_seo'
import Container from "~/components/Container"
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
  mixins: [paginate, dynamicSEO],
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
    this.setPages(this.currentPagesChunk)
    this.setPagesPrefix("projects")
    this.resetLastPage()
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix", "resetLastPage"])
  },
  computed: {
    currentImages() {
      if (isEmpty(this.currentChunk)) { return [] }
      if (this.pageNumber === 0) {
        // let emptyImage = new Image()
        const mappedImages = this.currentChunk.map((url) => {
          // emptyImage.src = url
          return {
            index: this.currentChunk.indexOf(url) + 1,
            url,
            // orientation: emptyImage.width > emptyImage.height ? 'landscape' : 'portrait'
          }
        })
        return mappedImages
      } else {
        let current = this.currentChunk
        current = [current[1], current[0], current[2], current[3]].filter(i => i)
        if (current.length === 1) {
          current.splice(0, 0, '')
          // let emptyImage = new Image()
          const switchedImages = current.map((url) => {
            // emptyImage.src = url
            return {
              index: this.currentChunk.indexOf(url) + 1 || -1,
              url,
              // orientation: emptyImage.width > emptyImage.height ? 'landscape' : 'portrait'
            }
          })
          return switchedImages
        } else {
          // let emptyImage = new Image()
          const switchedImages = current.map((url) => {
            // emptyImage.src = url
            return {
              index: current.indexOf(url) + 1,
              url,
              // orientation: emptyImage.width > emptyImage.height ? 'landscape' : 'portrait'
            }
          })
          return switchedImages
        }
      }
    },
    sortedWithUrls() {
      if (isEmpty(this.sortedImages)) { return [] }
      // let emptyImage = new Image()
      return this.sortedImages.map((url) => {
        // emptyImage.src = url
        return {
          index: this.sortedImages.indexOf(url) + 1,
          url,
          // orientation: emptyImage.width > emptyImage.height ? 'landscape' : 'portrait'
        }
      })
    },
    sortedImages() {
      let chunkers = chunk(this.$data.pages, 3)
      chunkers = chunkers.map(chunk => {
        if (chunkers.indexOf(chunk) === 0) {
          const firstThree = chunk.slice(0,3)
          return firstThree
        } else {
          let portrait = chunk.slice(0,1)
          let rest = chunk.slice(1)
          rest.splice(1, 0, portrait.join(''))
          return rest
        }
      })
      return uniq(flatten(chunkers))
    },
    allPagesChunks() {
      if (isEmpty(this.$data.allPages)) { return [] }
      const allPages = sortBy(this.$data.allPages, [p => get(p, 'attributes.page'), p => get(p, 'attributes.page_position')])
      const chunks = chunk(allPages, 3)
      return chunks.map(chunk => [chunk[1], chunk[0], chunk[2]])
    },
    currentPagesChunk() {
      if (isEmpty(this.allPagesChunks)) { return [] }
      let chunk = this.allPagesChunks[get(this.$data.page, 'attributes.page', 1) - 1] || []
      return chunk.slice(0, 3)
    },
  },
  components: {
    Container,
    ProgressBar,
    ImagesList
  }
}
</script>

<style lang="scss" scoped>
#mobile-view {
  display: block;
  overflow: visible;
}
</style>
