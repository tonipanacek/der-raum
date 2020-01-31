<!-- <template>
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
 -->
<template>
  <div
  id="rooms"
  class="rooms"
  v-on:wheel.prevent="handleScroll"
  >
    <Container>
      <RoomsList
      class="section"
      v-if="isChunky"
      :rooms="currentChunk"
      :goingUp="goingUp"
      />
      <RoomsList
      class="section"
      id="mobile-view"
      v-if="isChunky"
      :rooms="currentChunk"
      :goingUp="goingUp"
      />
    </Container>
    <ProgressBar :total="pagesChunks.length - 1" :page="pageNumber" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy } from "lodash"
import paginate from '~/plugins/paginate'
import Container from "~/components/Container"
import RoomsList from "~/components/RoomsList"
import ProgressBar from "~/components/ProgressBar"

export default {
  name: 'roomsIndex',
  mixins: [paginate],
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context(
      "~/content/rooms/",
      true,
      /\.md$/
    )
    let pages = allPages.keys().map(key => {
      // give back the value of each page context
      return allPages(key)
    })
    pages = sortBy(pages, page => get(page, 'attributes.page'))
    return {
      pages
    }
  },
  components: {
    Container,
    RoomsList,
    ProgressBar
  },
  mounted() {
    this.setPages(this.currentChunk)
    this.setPagesPrefix("rooms")
  },
  methods: {
    getTitle(chunk) {
      return this.formatSlug(get(chunk, '[0].attributes.title', ''))
    },
    ...mapActions(["setPages", "setPagesPrefix"])
  },
  watch: {
    currentChunk(chunk) {
      this.setPages(chunk)
    }
  }
}
</script>

<style lang="scss" scoped>
.rooms {
  display: flex;
  flex-direction: column;
  &, & article, & .container, & .section {
    display: block;
    min-height: 100%;
    height: 100%;
    max-width: none;
  }
  .section {
    min-height: 100%;
  }
}
#mobile-view {
  display: none;
}
@include respond-to('large') {
  #mobile-view {
    display: none;
  }
}
</style>


