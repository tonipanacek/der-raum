<template>
  <Container>
    <div
    id="rooms-desktop"
    class="rooms"
    v-on:wheel.prevent="handleScroll"
    >
      <RoomsList
      class="section"
      v-if="isChunky"
      :rooms="currentChunk"
      :goingUp="goingUp"
      />
      <ProgressBar :total="pagesChunks.length - 1" :page="pageNumber" />
    </div>
    <div
    id="rooms-mobile"
    class="rooms"
    >
      <RoomsList
      class="section"
      id="mobile-view"
      v-if="isChunky"
      :rooms="allPagesView"
      :goingUp="goingUp"
      />
    </div>
  </Container>
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
    pages = sortBy(pages, page => get(page, 'attributes.position'))
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
#rooms-mobile {
  display: block;
}
#rooms-desktop {
  display: none;
}
@include respond-to('large') {
  #rooms-mobile{
    display: none;
  }
  #rooms-desktop{
  display: block;
  }
}
</style>


