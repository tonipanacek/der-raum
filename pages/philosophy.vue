<template>
  <TextImageGrid :page="page" />
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy } from "lodash"
import seo from "~/content/data/seo"
import Container from "~/components/Container"
import TextImageGrid from "~/components/TextImageGrid"

export default {
  layout: 'layout',
  name: 'philosophy',
  nuxtI18n: {
    paths: {
      en: '/philosophy',
      de: '/philosophie'
    }
  },
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar_titles.philosophy')}`
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

    const page = pages.find(p => get(p, `attributes.title`) === 'Philosophy')
    return {
      pages,
      page
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
