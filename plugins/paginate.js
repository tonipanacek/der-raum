// Mixin (must be imported into components) that provides a pagination effect
// In the component, define a computed/data property calls `this.pages`. Then this mixin will do the rest for you :)
import { chunk, isEmpty, throttle } from "lodash"

export default {
  data() {
    return {
      max: 4, // max number of items to display on a page
      pageNumber: 0,
      refreshRate: 500,
      changeThreshold: 10
    }
  },
  computed: {
    pagesChunks() {
      if (isEmpty(this.pages)) { return [] }
      const chunks = chunk(this.pages, this.max - 1)
      const chunksPlusNext = chunks.map((chunk, index) => {
        const nextChunk = chunks[index + 1] || []
        return [...chunk, nextChunk[0]].filter(c => c)
      })
      return chunksPlusNext
    },
    currentChunk() {
      if (this.pageNumber === null || isEmpty(this.pagesChunks)) { return [] }
      return this.pagesChunks[this.pageNumber]
    },
    isChunky() {
      return !isEmpty(this.currentChunk)
    },
    arePages() {
      return !isEmpty(this.pages)
    },
    throttledHandlePageTransition() {
      return throttle(this.handlePageTransition, this.refreshRate)
    },
  },
  mounted() {
    window.addEventListener("keyup", this.handleKeyUp)
  },
  destroyed() {
    window.removeEventListener("keyup", this.handleKeyUp)
  },
  methods: {
    incrementPage() {
      if (this.pageNumber < this.pagesChunks.length - 1) {
        this.pageNumber += 1
      }
    },
    decrementPage() {
      if (this.pageNumber > 0) {
        this.pageNumber -= 1
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
      if (event.key.match(/(down|right)/i)) {
        this.incrementPage()
        return false;
      } else if (event.key.match(/(up|left)/i)) {
        this.decrementPage()
        return false;
      }
    }
  }
}
