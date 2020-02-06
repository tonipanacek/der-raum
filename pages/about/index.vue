<template>
  <div id="about" />
</template>

<script>
import { get, min } from "lodash"

export default {
  nuxtI18n: {
    paths: {
      en: '/about',
      de: '/ueber'
    }
  },
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context("~/content/about/", true, /\.md$/)
    const pages = allPages.keys().map(key => {
      // give back the value of each about context
      return allPages(key)
    })
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
      ]
    }
  },
  mounted() {
    const pages = this.$data.pages
    const positions = pages.map(page => get(page, "attributes.position"))
    const minPosition = min(positions)
    const page = pages.find(
      page => get(page, "attributes.position") === minPosition
    )
    const slug = this.formatSlug(this.$ta(page.attributes, 'title'))
    const redirectPath = this.localePath({
      name: "about-slug",
      params: {
        slug
      }
    })
    this.$router.push(redirectPath)
  }
}
</script>
