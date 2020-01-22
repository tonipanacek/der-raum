<template>
  <div
  id="projects"
  class="projects"
  v-on:wheel.prevent="handleScroll"
  >
    <Container>
      <ProjectsList
      class="section"
      v-if="isChunky"
      :projects="currentChunk"
      />
    </Container>
    <ProgressBar :total="pagesChunks.length - 1" :page="page" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { get, sortBy, chunk, isEmpty, throttle } from "lodash"
import Container from "~/components/Container"
import ProjectsList from "~/components/ProjectsList"
import ProgressBar from "~/components/ProgressBar"

export default {
  name: 'projectsIndex',
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context(
      "~/content/projects/",
      true,
      /\.md$/
    )
    let pages = allPages.keys().map(key => {
      // give back the value of each page context
      return allPages(key)
    })
    pages = sortBy(pages, page => page.position)
    return {
      pages
    }
  },
  components: {
    Container,
    ProjectsList,
    ProgressBar
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("projects")
    window.addEventListener("keyup", this.handleKeyUp)
  },
  destroyed() {
    window.removeEventListener("keyup", this.handleKeyUp)
  },
  data() {
    return {
      max: 4, // max number of items to display on a page
      page: 0,
      refreshRate: 500,
      changeThreshold: 10
    }
  },
  computed: {
    pagesChunks() {
      if (isEmpty(this.sortedPages)) { return [] }
      const chunks = chunk(this.sortedPages, this.max - 1)
      const chunksPlusNext = chunks.map((chunk, index) => {
        const nextChunk = chunks[index + 1] || []
        return [...chunk, nextChunk[0]].filter(c => c)
      })
      return chunksPlusNext
    },
    currentChunk() {
      return this.pagesChunks[this.page]
    },
    isChunky() {
      return !isEmpty(this.currentChunk)
    },
    anchors() {
      return this.pagesChunks.map((page, index) => `section${index}`)
    },
    arePages() {
      return !isEmpty(this.sortedPages)
    },
    throttledHandlePageTransition() {
      return throttle(this.handlePageTransition, this.refreshRate)
    },
    ...mapGetters(['sortedPages'])
  },
  methods: {
    getTitle(chunk) {
      return this.formatSlug(get(chunk, '[0].attributes.title', ''))
    },
    incrementPage() {
      if (this.page < this.pagesChunks.length - 1) {
        this.page += 1
      }
    },
    decrementPage() {
      if (this.page > 0) {
        this.page -= 1
      }
    },
    handleScroll(event) {
      this.throttledHandlePageTransition(event.wheelDelta)
    },
    handlePageTransition(change) {
      if (change < -1 * this.changeThreshold) {
        this.incrementPage()
      } else if (change > this.changeThreshold) {
        this.decrementPage()
      }
    },
    handleKeyUp(event) {
      event.preventDefault;
      if (event.key.match(/down/i)) {
        this.incrementPage()
        return false;
      } else if (event.key.match(/up/i)) {
        this.decrementPage()
        return false;
      }
    },
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.section {
  min-height: 100%;
}
</style>
