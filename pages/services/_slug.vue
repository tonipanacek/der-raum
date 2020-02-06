<template>
  <Container id="service">
    <Article>
      <div class="image-container">
        <Frame>
          <PrevNextButtons :prev="prevLink" :next="nextLink" />
          <img :src="$tp('image')" alt="Image of service" />
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
import { get, sortBy, kebabCase } from "lodash"
import Container from '~/components/Container'
import Frame from '~/components/Frame'
import PrevNextButtons from '~/components/PrevNextButtons'
import prevNext from '~/plugins/prev_next'
import Article from "~/components/Article"

export default {
  nuxtI18n: {
    paths: {
      en: '/services/:slug',
      de: '/leistungen/:slug'
    }
  },
  mixins: [prevNext],
  components: {
    Frame,
    Container,
    PrevNextButtons,
    Article,
    PrevNextButtons
  },
  async asyncData({ app, params, error }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug

      // create context via webpack to map over all pages
      const allPages = await require.context(
        "~/content/services/",
        true,
        /\.md$/
      )
      const pages = allPages.keys().map(key => {
        // give back the value of each page context
        return allPages(key)
      })

      const locale = app.i18n.locale
      const page = pages.find(p => kebabCase(get(p, `attributes.${locale}_title`)) === slug)

      return {
        page,
        slug,
        pages
      }
    } catch (err) {
      error({ statusCode: 404, message: "No service found" })
    }
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("services")
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  },
  // computed: {
  //   page() {
  //     return this.$data.pages.find(p => this.formatSlug(this.$ta(p.attributes, 'title')) === this.$data.slug)
  //   }
  // }
}
</script>
