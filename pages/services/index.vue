<template>
  <div id="services" />
</template>

<script>
import { get, min } from "lodash"

export default {
  nuxtI18n: {
    paths: {
      en: '/services',
      de: '/leistungen'
    }
  },
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context(
      "~/content/services/",
      true,
      /\.md$/
    )
    const pages = allPages.keys().map(key => {
      // give back the value of each page context
      return allPages(key)
    })
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
