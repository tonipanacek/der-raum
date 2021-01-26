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
      // if (this.$route.path.match(/^(\/projekte|\/en\/projects)$/) || this.$route.path === '/') {
      if (this.$route.path.match(/^(\/|\/en\/)$/)) {
        chunks = chunks.map((c) => {
          if (c.length === this.max - 1) {
            return [c[0], c[1], c[2]].filter(c => c)
          } else {
            return [c[0], c[1]].filter(c => c)
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
        // if (this.$route.path.match(/^(\/projekte|\/en\/projects)$/) || this.$route.path === '/') {
        if (this.$route.path.match(/^(\/|\/en\/)$/)) {
          chunkers = chunks.map((c, index) => {
            const nextPortrait = get(chunks, `[${index + 1}][1]`)
            if (c.length === this.max - 1) {
              return [c[0], c[1], c[2], nextPortrait].filter(c => c)
            } else if (c.length === 1) {
              c.splice(0, 0, '')
              return [c[0], c[1]]
            } else {
              return [c[0], c[1], nextPortrait].filter(c => c)
            }
          })
        } else {
          chunks = chunks.map((c, index) => {
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
        this.setLastPage(chunks.length - 1)
        return chunks
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
    ...mapState(['pageNumber'])
  },
  mounted() {
    // window.addEventListener("keyup", this.handleKey)
  },
  destroyed() {
    // window.removeEventListener("keyup", this.handleKey)
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
    ...mapActions([
      'incrementPageNumber',
      'decrementPageNumber',
      'resetPageNumber',
      'setLastPage'
    ])
  }
}
