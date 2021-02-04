<template>
  <Container class="text-image-grid" :id="formatSlug($ta(page.attributes, 'title'))">
      <template v-for="(section, index) in sections">
        <div v-if="section.image" class="section-item image-container">
          <div class="frame-wrapper">
            <Frame :n="findOrientation(index) === 'portrait' ? 9 : 12" :d="findOrientation(index) === 'portrait' ? 16 : 9">
              <img :src="$ta(section, 'image')"/>
            </Frame>
          </div>
        </div>
        <div v-else class="section-item text">
          <h1 v-if="section.de_title_of_section">{{ $ta(section, "title_of_section") }}</h1>
          <vue-markdown>{{ $ta(section, "text_section") }}</vue-markdown>
        </div>
      </template>
  </Container>
</template>

<script>
import { get, min, sortBy, kebabCase } from "lodash"
import { mapActions, mapState } from "vuex"
import seo from "~/content/data/seo"
import Article from "~/components/Article"
import Frame from '~/components/Frame'
import Container from '~/components/Container'

export default {
  nuxtI18n: {
    paths: {
      en: '/:slug',
      de: '/:slug'
    }
  },
  components: {
    Article,
    Frame,
    Container
  },
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar_titles.services')}`
    }
  },
  async asyncData({ app, store, params }) {
    // create context via webpack to map over all blog pages
    const slug = params.slug

    let pages = await require.context(
      "~/content/andere/",
      true,
      /\.md$/
    )
    pages = pages.keys().map(key => {
      // give back the value of each page context
      return pages(key)
    })

    const locale = app.i18n.locale
    const page = pages.find(p => kebabCase(get(p, `attributes.title`)) === slug)

    let sections = get(page, 'attributes.grid-sections')
    sections = sortBy(sections, [section => get(section, 'group_number'), section => get(section, 'group_position')])

    return {
      pages,
      page,
      sections
    }
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("other")
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    getTitle(page) {
      return this.formatSlug(get(page, `attributes[${this.locale}_title]`))
    },
    findOrientation(index) {
      return index % 2 === 1 ? "portrait" : "landscape"
    },
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>

<style lang="scss" scoped>
// .text-image-grid {
//     @include respond-to('large') {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       grid-template-rows: fit-content(260px);
//       grid-gap: 2rem;
//       margin-bottom: spacing(frame);
//       grid-auto-flow: row dense;
//       .section-item:nth-child(1) {
//         grid-row: span 2;
//       }
//     }
//   }
  .text-image-grid {
    @include respond-to('large') {
    .image-container {
      float: left;
      width: 55ch;
    }
    .text {
      padding-left: 3rem;
    }
    .frame > img { object-fit: contain }
    }
  }
</style>
