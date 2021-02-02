<template>
  <Container class="text-image-grid">
      <template v-for="section in sections" :id="formatSlug($ta(page.attributes, 'title'))">
        <div v-if="section.image" class="section-item image-container">
          <Frame
            :title="$ta(page.attributes,'title')"
            :n="11"
            :d="9">
            <img :src="$ta(section, 'image')">
          </Frame>
        </div>
        <div v-else class="section-item text">
          <h1 v-if="section.title_of_section">{{ $ta(section, "title_of_section") }}</h1>
          <vue-markdown>{{ $ta(section, "text-section") }}</vue-markdown>
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
  async asyncData({ params }) {
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

    const page = pages.find(p => kebabCase(get(p, `attributes.title`)) === slug)
    let sections = get(page, 'attributes.grid-sections')
    sections = sortBy(sections, [section => get(section, 'group-number'), section => get(section, 'group-position')])

    return {
      pages,
      page,
      sections
    }
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("other")
    // this.scrollIntoView()
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
    scrollIntoView() {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.setAnchorItem(entry.target.id)
            this.addParamsToLocation(entry.target.id)
            entry.target.firstElementChild.style.opacity = 1
            this.scrollTransitions(entry.target)
            // this.$router.push({ hash: '#' + entry.target.id })
          } else {
            // entry.target.firstElementChild.style.opacity = 0.5
            this.scrollTransitions(entry.target)
          }
        })
      }, { threshold: 0.8});
      const divs = this.pages.map(page => document.querySelector('#' + this.getTitle(page)))
      divs.forEach(div => observer.observe(div))
    },
    scrollTransitions(element) {
      window.addEventListener('scroll', function() {
        if (element.firstElementChild.className !== 'text') {
          const frame = element.firstElementChild
          if (window.scrollY > frame.offsetTop) {
            frame.style.opacity = 1 - (window.scrollY - frame.offsetTop) / frame.offsetHeight
          }
        }
      })
    },
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>

<style lang="scss">
  .text-image-grid {
    @include respond-to('large') {
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: fit-content(260px);
      margin-bottom: spacing(frame);
      grid-auto-flow: row dense;
      align-items: start;
      .image-container {
        grid-row: span 2;
        min-height: 600px;
      }
    }
  }
</style>
