import { get, isEmpty, findIndex } from 'lodash'

export default {
  computed: {
    currentPageIndex() {
      return findIndex(this.$data.pages, page => get(page, 'attributes.title') === get(this.$data.page, 'attributes.title'))
    },
    nextPage() {
      if (!this.currentPageIndex < 0) { return '' }
      return this.$data.pages[this.currentPageIndex + 1]
    },
    prevPage() {
      if (!this.currentPageIndex) { return '' }
      return this.$data.pages[this.currentPageIndex - 1]
    },
    nextLink() {
      if (isEmpty(this.nextPage)) { return '' }
      return `/${this.$store.state.pagesPrefix}/${this.formatSlug(get(this.nextPage, 'attributes.title', ''))}`
    },
    prevLink() {
      if (isEmpty(this.prevPage)) { return '' }
      return `/${this.$store.state.pagesPrefix}/${this.formatSlug(get(this.prevPage, 'attributes.title', ''))}`
    }
  }
}
