<template>
  <div id="about" />
</template>

<script>
import { get, min, sortBy } from "lodash"

export default {
  nuxtI18n: {
    paths: {
      en: '/about',
      de: '/uber'
    }
  },
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context("~/content/about/", true, /\.md$/)
    let pages = allPages.keys().map(key => {
      // give back the value of each about context
      return allPages(key)
    })
    pages = sortBy(pages, page => get(page, 'attributes.position'))
    return {
      pages: [
        ...pages,
        {
          attributes: {
            title: 'Business Partner',
            en_title: 'Business Partner',
            de_title: 'Business Partner',
            position: 4
          },
          // attributes: {
          //   title: 'Press',
          //   en_title: 'Press',
          //   de_title: 'Press',
          //   position: 5
          // }
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
