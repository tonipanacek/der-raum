// Mixin (must be imported into components) that provides a pagination effect
// In the component, define a computed/data property calls `this.pages`. Then this mixin will do the rest for you :)
import { get, isEmpty, throttle } from "lodash"

export default {
  data() {
    return {
      max: 4, // max number of items to display on a page
      pageNumber: 0,
      refreshRate: 750,
      changeThreshold: 15,
      goingUp: false
    }
  },
  computed: {
    pagesChunks() {
      if (isEmpty(this.pages)) { return [] }
      const getChunks = (pages, chunks = [], i = 0) => {
        if (isEmpty(pages)) { return chunks }
        let chunk = pages.slice(0, this.max - 1)
        const nextPages = pages.slice(this.max - 1)
        const nextPage = nextPages.find(p => get(p, 'attributes.portrait')) || nextPages[1]
        const prevPage = get(chunks.slice(-1), `[0][${this.max}]`)
        const currentPortraits = chunk.filter(p => get(p, 'attributes.portrait', false))
        chunk = [prevPage, ...chunk, nextPage].filter(c => c)
        const isPagePortrait = get(chunk[0], 'attributes.portrait', get(this.page, 'attributes.portrait', false))
        if (isPagePortrait && i % 2) {
          chunk = [chunk[1], chunk[0], chunk[3], chunk[2]].filter(c => c)
        } else {
          chunk = [chunk[0], chunk[1], chunk[2], chunk[3]].filter(c => c)
        }
        return getChunks(nextPages, [...chunks, chunk], i += 1)
      }
      return getChunks(this.pages)
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
    window.addEventListener("keyup", this.handleKey)
  },
  destroyed() {
    window.removeEventListener("keyup", this.handleKey)
  },
  methods: {
    incrementPage() {
      if (this.pageNumber < this.pagesChunks.length - 1) {
        this.pageNumber += 1
        this.goingUp = true
      }
    },
    decrementPage() {
      if (this.pageNumber > 0) {
        this.pageNumber -= 1
        this.goingUp = false
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
    handleKey(event) {
      event.preventDefault();
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
