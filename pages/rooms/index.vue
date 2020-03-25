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
      :rooms="currentRooms"
      :goingUp="goingUp"
      :mobile="false"
      @increment="incrementPage"
      />
      <ProgressBar :total="pagesChunks.length - 1" :page="pageNumber" @increment="incrementPage" @decrement=decrementPage />
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
      :mobile="true"
      />
    </div>
  </Container>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy, isEmpty } from "lodash"
import seo from "~/content/data/seo"
import paginate from '~/plugins/paginate'
import Container from "~/components/Container"
import RoomsList from "~/components/RoomsList"
import ProgressBar from "~/components/ProgressBar"

export default {
  name: 'roomsIndex',
  scrollToTop: false,
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar.rooms')}`
    }
  },
  nuxtI18n: {
    paths: {
      en: '/rooms',
      de: '/raume'
    }
  },
  mixins: [paginate],
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
    RoomsList,
    ProgressBar
  },
  mounted() {
    this.setPages(this.currentChunk.slice(0, this.max - 1))
    this.setPagesPrefix("rooms")
  },
  computed: {
    currentRooms() {
      if (isEmpty(this.currentChunk)) { return [] }
      if (this.pageNumber === 0) {
        return this.currentChunk
      } else {
        let current = this.currentChunk
        current = [current[1], current[0], current[2], current[3]].filter(i => i)
        if (current.length === 1) {
          current.splice(0, 0, { attributes : '' })
          return current
        } else {
          return current
        }
      }
    }
  },
  methods: {
    getTitle(chunk) {
      return this.formatSlug(get(chunk, '[0].attributes.title', ''))
    },
    ...mapActions(["setPages", "setPagesPrefix"])
  },
  watch: {
    currentChunk(chunk) {
      this.setPages(this.currentChunk.slice(0, this.max - 1))
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


