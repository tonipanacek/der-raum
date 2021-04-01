<template>
  <TextImageGrid :page="page" />
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy } from "lodash"
import seo from "~/content/data/seo"
import Article from "~/components/Article"
import TextImageGrid from "~/components/TextImageGrid"

export default {
  layout: 'layout',
  name: 'carpentry',
  nuxtI18n: {
    paths: {
      en: '/carpentry',
      de: '/tischlerei'
    }
  },
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar_titles.carpentry')}`
    }
  },
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context(
      "~/content/andere/",
      true,
      /\.md$/
    )
    let pages = allPages.keys().map(key => {
      // give back the value of each page context
      return allPages(key)
    })

    const page = pages.find(p => get(p, `attributes.title`) === 'Carpentry')
    return {
      pages,
      page
    }
  },
  components: {
    Article,
    TextImageGrid
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("other")
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  },
}
</script>
