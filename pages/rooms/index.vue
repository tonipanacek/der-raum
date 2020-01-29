<template>
  <div id="rooms" />
</template>

<script>
import { get, min, sortBy } from "lodash"

export default {
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context("~/content/rooms/", true, /\.md$/)
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
    const positions = pages.map(page => get(page, "attributes.position"))
    const minPosition = min(positions)
    const page = pages.find(
      page => get(page, "attributes.position") === minPosition
    )
    const slug = this.formatSlug(get(page, "attributes.title", ""))
    const redirectPath = this.localePath({
      name: "rooms-slug",
      params: {
        slug
      }
    })
    this.$router.push(redirectPath)
  }
}
</script>

