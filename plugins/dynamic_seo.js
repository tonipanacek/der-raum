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
      title: `${seo.shortTitle} | ${title}`,
      cloudinaryBaseUrl: 'https://res.cloudinary.com/dwvtvuml8/image/upload/',
      meta: [
        {
          hid: "description",
          name: "description",
          content: description || seo.description
        },
        {
          hid: "og:description",
          name: "og:description",
          content: description || seo.description
        },
        {
          hid: "image",
          name: "image",
          content: image
        },
        {
          hid: "og:image",
          name: "og:image",
          content: image
        }
      ]
    }
  }
}
