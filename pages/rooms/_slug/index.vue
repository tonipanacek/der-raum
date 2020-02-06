<template>
  <Container id="room">
    <Article>
      <div class="image-container">
        <Frame>
          <PrevNextButtons :prev="prevLink" :next="nextLink" />
          <img :src="$tp('image')" alt="Image of room" />
        </Frame>
      </div>
      <div class="text">
        <h1>{{ $tp("title") }}</h1>
        <vue-markdown>{{ $tp("description") }}</vue-markdown>
      </div>
    </Article>
  </Container>
</template>

<script>
import { mapActions } from "vuex"
import { get, sortBy, isEmpty, chunk, kebabCase } from "lodash"
import Frame from '~/components/Frame'
import Container from '~/components/Container'
import PrevNextButtons from '~/components/PrevNextButtons'
import Article from "~/components/Article"
import prevNext from '~/plugins/prev_next'

export default {
  nuxtI18n: {
    paths: {
      en: '/rooms/:slug',
      de: '/raeume/:slug'
    }
  },
  mixins: [prevNext],
  components: {
    Frame,
    Container,
    PrevNextButtons,
    Article
  },
  async asyncData({ app, params, error }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug

      // create context via webpack to map over all pages
      let allPages = await require.context(
        "~/content/rooms/",
        true,
        /\.md$/
      )
      allPages = allPages.keys().map(key => {
        // give back the value of each page context
        return allPages(key)
      })

      const locale = app.i18n.locale
      const page = allPages.find(p => kebabCase(get(p, `attributes.${locale}_title`)) === slug)

      return {
        page,
        slug,
        allPages,
        pages: allPages
      }
    } catch (err) {
      console.debug(err)
      error({ statusCode: 404, message: "No room found" })
    }
  },
  mounted() {
    this.setPages(this.allPagesCurrentChunk)
    this.setPagesPrefix("rooms")
  },
  computed: {
    allPagesChunks() {
      if (isEmpty(this.$data.allPages)) { return [] }
      const allPages = sortBy(this.$data.allPages, p => get(p, 'attributes.position'))
      return chunk(allPages, 3)
    },
    allPagesCurrentChunk() {
      if (isEmpty(this.allPagesChunks)) { return [] }
      const position = parseInt(get(this.$data.page, 'attributes.position', 1))
      const pageNumber = Math.floor((position - 1) / 3)
      const chunk = this.allPagesChunks[pageNumber] || []
      return chunk.slice(0, 3)
    },
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>
