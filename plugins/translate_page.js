import Vue from "vue"
import { get, isEmpty } from "lodash"

const translatePage = {
  // Pages like `services` pages load markdown content from Forestry CMS. This mixin allows for translation of Markdown attributes from that file, like (for example) en_description. If an attribute that does not have a locale prefix (en_ or de_) is requested, then the attribute is returned with no translation (image or title).
  methods: {
    $ta(attrs, term) {
      // Short for 'translate attribute'. Used for any set of attributes (object) and a single term (string). Useful for, for example, lists of pages
      if (isEmpty(attrs) || isEmpty(this.$i18n)) {
        return ""
      }
      const { locale } = this.$i18n
      return get(attrs, `${locale}_${term}`, get(attrs, term, ""))
    },
    $tp(term) {
      // Short for 'translate page'. Automatically loads attrs from `this.page` (the loaded markdown content)
      return this.$ta(get(this.page, "attributes", {}), term)
    },
    formatSlug(title) {
      if (!title) {
        return ""
      }
      const regex = / /gi
      return title
        .toLowerCase()
        .trim()
        .replace(regex, "-")
    }
  }
}

Vue.mixin(translatePage)
