import { mapGetters } from 'vuex'
import { get, sortBy, chunk, isEmpty, throttle } from "lodash"

export default {
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
    arePages() {
      return !isEmpty(this.sortedPages)
    },
    throttledHandlePageTransition() {
      return throttle(this.handlePageTransition, this.refreshRate)
    },
    ...mapGetters(['sortedPages'])
  },
  mounted() {
    window.addEventListener("keyup", this.handleKeyUp)
  },
  destroyed() {
    window.removeEventListener("keyup", this.handleKeyUp)
  },
  methods: {
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
    }
  }
}
