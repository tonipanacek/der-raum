import { get, isEmpty, findIndex } from 'lodash'

export default {
  computed: {
    currentPageIndex() {
      // if (isEmpty(this.$data.pages)) { return -1 }
      console.log(this.$data.pages)
      console.log(this.$data.page)
      return findIndex(this.$data.pages, page => get(page, 'attributes.title') === get(this.$data.page, 'attributes.title'))
    },
    nextPage() {
      if (this.currentPageIndex < 0) { return '' }
      return this.$data.pages[this.currentPageIndex + 1]
    },
    prevPage() {
      if (this.currentPageIndex < 0) { return '' }
      return this.$data.pages[this.currentPageIndex - 1]
    },
    nextLink() {
      if (isEmpty(this.nextPage)) { return '' }
      return this.localePath({
        name: `${this.$store.state.pagesPrefix}-slug`,
        params: {
          slug: this.formatSlug(this.$ta(this.nextPage.attributes, 'title'))
        }
      })
    },
    prevLink() {
      if (isEmpty(this.prevPage)) { return '' }
      return this.localePath({
        name: `${this.$store.state.pagesPrefix}-slug`,
        params: {
          slug: this.formatSlug(this.$ta(this.prevPage.attributes, 'title'))
        }
      })
    }
  }
}
