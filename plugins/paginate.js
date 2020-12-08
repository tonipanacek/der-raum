// Mixin (must be imported into components) that provides a pagination effect
// In the component, define a computed/data property calls `this.pages`. Then this mixin will do the rest for you :)
import { get, isEmpty, throttle, chunk, sortBy, flatten, uniq } from "lodash"
import { mapState, mapActions, mapGetters } from "vuex"

export default {
  data() {
    return {
      max: 4, // max number of items to display on a page
      // pageNumber: 0, // this now comes from state instead
      refreshRate: 500, // amount of time between each scroll action
      trackpadThreshold: 7, // how many steps must be registered on the scroll wheel
      mouseThreshold: 0.5,
      goingUp: true
    }
  },
  computed: {
    allPagesView() {
      if (isEmpty(this.pages)) { return [] }
      const allPages = sortBy(this.pages, [p => get(p, 'attributes.page'), p => get(p, 'attributes.page_position')])
      let chunks = chunk(allPages, 3)
      if (this.$route.path.match(/^(\/|\/en\/)$/)) {
        chunks = chunks.map((c) => {
          if (c.length === this.max - 1) {
            return [c[0], c[1], c[2]].filter(c => c)
          } else {
            return [c[1], c[0]].filter(c => c)
          }
        })
        return uniq(flatten(chunks))
      } else {
        return this.pages
      }
    },
    pagesChunks() {
      if (isEmpty(this.pages)) { return [] }
      const getChunks = (pages) => {
        if (isEmpty(pages)) { return [] }
        const allPages = sortBy(pages, [p => get(p, 'attributes.page'), p => get(p, 'attributes.page_position')])
        let chunks = chunk(allPages, 3)
        let chunkers
        if (this.$route.path.match(/^(\/|\/en\/)$/)) {
          chunkers = chunks.map((c, index) => {
            const nextPortrait = get(chunks, `[${index + 1}][1]`)
            if (c.length === this.max - 1) {
              return [c[0], c[1], c[2], nextPortrait].filter(c => c)
            } else if (c.length === 1) {
              c.splice(0, 0, '')
              return [c[0], c[1]]
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
        this.setLastPage(chunkers.length - 1)
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
    // throttledHandlePageTransition() {
    //   return throttle(this.handlePageTransition, this.refreshRate)
    // },
    lastItemScrollOnClick() {
      if (isEmpty(this.pagesChunks)) { return [] }
      if (this.pagesChunks.length === 4) {
        this.pagesChunks[3].addEventListener('click', this.handlePageTransition)
      }
    },
    ...mapState(['pageNumber'])
  },
  mounted() {
    window.addEventListener("keyup", this.handleKey)
  },
  destroyed() {
    window.removeEventListener("keyup", this.handleKey)
    this.resetPageNumber()
  },
  methods: {
    incrementPage() {
      if (this.pageNumber < this.pagesChunks.length - 1) {
        this.incrementPageNumber()
        this.goingUp = true
      }
    },
    decrementPage() {
      if (this.pageNumber > 0) {
        this.decrementPageNumber()
        this.goingUp = false
      }
    },
    handleScroll(event) {
      if (event.wheelDelta) {
        // this.throttledHandlePageTransition(event.wheelDelta, event.deltaMode)
      } else {
        // this.throttledHandlePageTransition(-event.deltaY, event.deltaMode)
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
    },
    ...mapActions([
      'incrementPageNumber',
      'decrementPageNumber',
      'resetPageNumber',
      'setLastPage'
    ])
  }
}
