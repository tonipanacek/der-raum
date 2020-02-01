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
import { get, sortBy } from "lodash"
import Frame from '~/components/Frame'
import Container from '~/components/Container'
import PrevNextButtons from '~/components/PrevNextButtons'
import Article from "~/components/Article"
import prevNext from '~/plugins/prev_next'

export default {
  mixins: [prevNext],
  components: {
    Frame,
    Container,
    PrevNextButtons,
    Article
  },
  async asyncData({ params, error }) {
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
      const sortedPages = sortBy(pages, page => get(page, 'attributes.position'))
      return {
        page,
        slug,
        pages,
        sortedPages
      }
    } catch (err) {
      console.debug(err)
      error({ statusCode: 404, message: "No room found" })
    }
  },
  mounted() {
    this.setPages(this.$data.sortedPages)
    this.setPagesPrefix("rooms")
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>
