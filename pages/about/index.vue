<template>
  <Container id="about">
    <Article v-for="page in pages" :key="page.attributes.title" :id="formatSlug($ta(page.attributes, 'title'))">
      <div class="image-container">
        <Frame :source="$ta(page.attributes, 'image')" :title="$ta(page.attributes,'title')" :alt="$ta(page.attributes, 'description')">
        </Frame>
      </div>
      <div class="text">
        <h1>{{ $ta(page.attributes, "title") }}</h1>
        <p>{{ $ta(page.attributes, "description") }}</p>
      </div>
    </Article>
  </Container>
</template>

<script>
import { get, min, sortBy } from "lodash"
import { mapActions } from "vuex"
import seo from "~/content/data/seo"
import Article from "~/components/Article"
import Frame from '~/components/Frame'
import Container from '~/components/Container'

export default {
  nuxtI18n: {
    paths: {
      en: '/about',
      de: '/uber'
    }
  },
  components: {
    Article,
    Frame,
    Container
  },
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbarTitles.about')}`
    }
  },
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context(
      "~/content/about/",
      true,
      /\.md$/
    )
    let pages = allPages.keys().map(key => {
      // give back the value of each page context
      return allPages(key)
    })
    pages = sortBy(pages, page => get(page, 'attributes.position'))
    return {
      pages
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

