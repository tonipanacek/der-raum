<template>
  <div id="about" />
</template>

<script>
import { get, min } from "lodash"

export default {
  async asyncData() {
    // create context via webpack to map over all blog abouts
    const allAbouts = await require.context("~/content/about/", true, /\.md$/)
    const abouts = allAbouts.keys().map(key => {
      // give back the value of each about context
      return allAbouts(key)
    })
    return {
      abouts
    }
  },
  mounted() {
    const abouts = this.$data.abouts || []
    const about = abouts[0]
    const slug = this.formatSlug(get(about, "attributes.title", ""))
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
