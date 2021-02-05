<template>
  <TextImageGrid :page="page" :sections="sections" />
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy } from "lodash"
import seo from "~/content/data/seo"
import Container from "~/components/Container"
import TextImageGrid from "~/components/TextImageGrid"

export default {
  layout: 'layout',
  name: 'studio',
  nuxtI18n: {
    paths: {
      en: '/studio',
      de: '/studio'
    }
  },
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar_titles.studio')}`
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

    const page = pages.find(p => get(p, `attributes.title`) === 'Studio')
    const sections = get(page.attributes, 'grid-sections')
    return {
      pages,
      page,
      sections
    }
  },
  components: {
    Container,
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
