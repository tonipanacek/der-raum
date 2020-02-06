<template>
  <Container id="about">
    <Article>
      <div class="image-container">
        <Frame>
            <PrevNextButtons :prev="prevLink" :next="nextLink" />
          <img :src="$tp('image')" alt="Image corresponding to about page" />
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
import { get, kebabCase } from 'lodash'
import Article from "~/components/Article"
import Frame from '~/components/Frame'
import Container from '~/components/Container'
import PrevNextButtons from '~/components/PrevNextButtons'
import prevNext from '~/plugins/prev_next'

export default {
  nuxtI18n: {
    paths: {
      en: '/about/:slug',
      de: '/ueber/:slug'
    }
  },
  mixins: [prevNext],
  components: {
    Frame,
    Container,
    PrevNextButtons,
    Article
  },
  async asyncData({ app, params }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug

      // create context via webpack to map over all pages
      const allPages = await require.context("~/content/about/", true, /\.md$/)
      const pages = allPages.keys().map(key => {
        // give back the value of each page context
        return allPages(key)
      })

      const locale = app.i18n.locale
      const page = pages.find(p => kebabCase(get(p, `attributes.${locale}_title`)) === slug)

      return {
        pages: [
          ...pages,
          {
            attributes: {
              title: 'Business Partner',
              en_title: 'Business Partner',
              de_title: 'Business Partner'
            }
          }
        ],
        slug,
        page
      }
    } catch (err) {
      console.debug(err)
      return false
    }
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("about")
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>
