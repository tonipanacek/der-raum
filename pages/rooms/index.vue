<template>
  <Container>
    <RoomsList
    :rooms="pages"
    :mobile="true"
    />
  </Container>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy, isEmpty } from "lodash"
import seo from "~/content/data/seo"
import Container from "~/components/Container"
import RoomsList from "~/components/RoomsList"

export default {
  name: 'roomsIndex',
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar_titles.rooms')}`
    }
  },
  nuxtI18n: {
    paths: {
      en: '/rooms',
      de: '/raume'
    }
  },
  async asyncData() {
    // create context via webpack to map over all room pages
    const allPages = await require.context(
      "~/content/rooms/",
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
  components: {
    Container,
    RoomsList
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("rooms")
  },
  destroyed() {
    this.resetLastPage()
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix", "resetLastPage"])
  }
}
</script>
