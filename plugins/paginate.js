// Mixin (must be imported into components) that provides a pagination effect
// In the component, define a computed/data property calls `this.pages`. Then this mixin will do the rest for you :)
import { get, isEmpty, throttle, chunk, sortBy } from "lodash"

export default {
  data() {
    return {
      max: 4, // max number of items to display on a page
      pageNumber: 0,
      refreshRate: 800, // amount of time between each scroll action
      trackpadThreshold: 3, // how many steps must be registered on the scroll wheel
      mouseThreshold: 0.5,
      goingUp: false
    }
  },
  computed: {
    allPagesView() {
      if (isEmpty(this.pages)) { return [] }
      return this.pages
    },
    pagesChunks() {
      if (isEmpty(this.pages)) { return [] }
      const getChunks = (pages) => {
        if (isEmpty(pages)) { return [] }
        const allPages = sortBy(pages, [p => get(p, 'attributes.page'), p => get(p, 'attributes.page_position')])
        let chunks = chunk(allPages, 3)
        let chunkers
        if (this.$route.path.match(/^(\/projekte|\/en\/projects)$/)) {
          chunkers = chunks.map((c, index) => {
            const nextPortrait = get(chunks, `[${index + 1}][0]`)
            if (c.length === this.max - 1) {
              return [c[1], c[0], c[2], nextPortrait].filter(c => c)
            } else {
              return [c[1], c[0], nextPortrait].filter(c => c)
            }
          })
        } else {
          chunkers = chunks.map((c, index) => {
            const nextPortrait = get(chunks, `[${index + 1}][0]`)
            if (get(this.page, 'attributes.orientation') === 'landscape' && index === 0) {
              return [c[0], c[1], c[2], nextPortrait].filter(c => c)
            } else if (c.length === this.max - 1) {
              return [c[0], c[1], c[2], nextPortrait].filter(c => c)
            } else {
              return [c[0], c[1], nextPortrait].filter(c => c)
            }
          })
        }
        return chunkers
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
    lastItemScrollOnClick() {
      if (isEmpty(this.pagesChunks)) { return [] }
      if (this.pagesChunks.length === 4) {
        this.pagesChunks[3].addEventListener('click', this.handlePageTransition)
      }
    }
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
      if (event.wheelDelta) {
        this.throttledHandlePageTransition(event.wheelDelta, event.deltaMode)
      } else {
        this.throttledHandlePageTransition(-event.deltaY, event.deltaMode)
      }
      return event
    },
    handlePageTransition(change, mode) {
      if (mode) {
        if (change < -1 * this.mouseThreshold) {
          this.incrementPage()
        } else if (change > this.mouseThreshold) {
          this.decrementPage()
        }
      } else {
        if (change < -1 * this.trackpadThreshold) {
          this.incrementPage()
        } else if (change > this.trackpadThreshold) {
          this.decrementPage()
        }
      }
    },
    handleKey(event) {
      event.preventDefault();
      if (event.key.match(/(down|right)/i)) {
        this.incrementPage()
        event.stopImmediatePropagation()
        return false;
      } else if (event.key.match(/(up|left)/i)) {
        this.decrementPage()
        event.stopImmediatePropagation()
        return false;
      }
    }
  }
}
