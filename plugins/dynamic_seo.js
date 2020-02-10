import { get } from 'lodash'
import seo from '../content/data/seo.json'

export default {
  head() {
    const attributes = get(this.$data.page, 'attributes', {})
    const meta = get(attributes, 'meta_tags', {})
    const title = this.$ta(meta, 'title') || this.$ta(attributes, 'title')
    const description = this.$ta(meta, 'description') || this.$ta(attributes, 'description')
    const image = this.image || this.$ta(attributes, 'image') || this.$ta(attributes, 'images[0]') || ''

    return {
      title: `${seo.title} | ${title}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: description || seo.description
        },
        {
          hid: "description",
          name: "description",
          content: description || seo.description
        },
        {
          hid: "image",
          name: "image",
          content: image
        }
      ]
    }
  }
}
