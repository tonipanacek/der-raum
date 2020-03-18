<template>
  <div id="services" />
</template>

<script>
import { get, min, sortBy } from "lodash"
import seo from "~/content/data/seo"

export default {
  nuxtI18n: {
    paths: {
      en: '/services',
      de: '/leistungen'
    }
  },
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar.rooms')}`
    }
  },
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context(
      "~/content/services/",
      true,
      /\.md$/
    )
    let pages = allPages.keys().map(key => {
      // give back the value of each page context
      return allPages(key)
    })
    pages = sortBy(pages, page => get(page, 'attributes.position'))
    console.log(pages)
    return {
      pages
    }
  },
  mounted() {
    const pages = this.$data.pages
    const positions = pages.map(page =>
      get(page, "attributes.position")
    )
    const minPosition = min(positions)
    const page = pages.find(
      page => get(page, "attributes.position") === minPosition
    )
    const slug = this.formatSlug(this.$ta(page.attributes, "title"))
    const redirectPath = this.localePath({
      name: "services-slug",
      params: {
        slug
      }
    })
    this.$router.push(redirectPath)
  }
}
</script>
