<template>
  <Container>
    <h1 class="accessible">{{ $tp("title") }}</h1>
    <vue-markdown class="accessible">{{ $tp("description") }}</vue-markdown>
    <ImagesList
    :imagesWithUrls="imagesWithUrls"
    :images="images"
    :title="$tp('title')"
    :totalCount="images.length"
    :slug="slug"
    :mobile="true"
    />
  </Container>
</template>

<script>
import { mapActions } from 'vuex'
import { get, isEmpty, kebabCase } from 'lodash'
import dynamicSEO from '~/plugins/dynamic_seo'
import Container from "~/components/Container"
import ImagesList from "~/components/ImagesList"

export default {
  name: 'projectsSlug',
  nuxtI18n: {
    paths: {
      de: '/projekte/:slug',
      en: '/projects/:slug'
    }
  },
  mixins: [dynamicSEO],
  async asyncData({ app, params, error, store }) {
    // get the slug as a param to import the correct md file
    try {
      // get current page data
      const slug = params.slug

      // create context via webpack to map over all pages
      let pages = await require.context(
        "~/content/projects/",
        true,
        /\.md$/
      )
      pages = pages.keys().map(key => {
        // give back the value of each page context
        return pages(key)
      })

      const locale = app.i18n.locale
      const page = pages.find(p => kebabCase(get(p, `attributes.${locale}_title`)) === slug)

      await store.dispatch('i18n/setRouteParams', {
        en: { slug: kebabCase(get(page, `attributes.en_title`)) },
        de: { slug: kebabCase(get(page, `attributes.de_title`)) }
      })

      const images = get(page, 'attributes.images', [])

      return {
        images,
        pages,
        page,
        slug
      }
    } catch (err) {
      error({ statusCode: 404, message: "No project found" })
    }
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("projects")
    this.resetLastPage()
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix", "resetLastPage"])
  },
  computed: {
    imagesWithUrls() {
      if (isEmpty(this.$data.images)) { return [] }
      return this.$data.images.map((url) => {
        return {
          index: this.$data.images.indexOf(url) + 1,
          url
        }
      })
    }
  },
  components: {
    Container,
    ImagesList
  }
}
</script>

<style lang="scss" scoped>
#mobile-view {
  display: block;
  overflow: visible;
}
</style>
