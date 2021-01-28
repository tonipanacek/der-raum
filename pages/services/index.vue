<template>
  <Container id="services-grid">
      <template v-for="service in pages" :id="formatSlug($ta(service.attributes, 'title'))">
        <div class="service-item image-container">
          <Frame
            :title="$ta(service.attributes,'title')"
            :style="'background-position-y:' + $ta(service.attributes, 'image_crop')">
            <img :src="$ta(service.attributes, 'image')" :alt="$ta(service.attributes, 'description')">
          </Frame>
          </Frame>
        </div>
        <div class="service-item text">
          <h1>{{ $ta(service.attributes, "title") }}</h1>
          <vue-markdown>{{ $ta(service.attributes, "description") }}</vue-markdown>
        </div>
      </template>
  </Container>
</template>

<script>
import { get, min, sortBy } from "lodash"
import { mapActions, mapState } from "vuex"
import seo from "~/content/data/seo"
import Article from "~/components/Article"
import Frame from '~/components/Frame'
import Container from '~/components/Container'

export default {
  nuxtI18n: {
    paths: {
      en: '/services',
      de: '/leistungen'
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
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context(
      "~/content/services/",
      true,
      /\.md$/
    )
    let pages = allPages.keys().map(key => {
      // give back the value of each page context
      return allPages(key)
    })
    pages = sortBy(pages, page => get(page, 'attributes.position'))
    return {
      pages
    }
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("services")
    // this.scrollIntoView()
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    ...mapState(["anchorItem"])
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
    addParamsToLocation(id) {
      history.replaceState(
        {},
        null,
        this.$route.path +
          '#' +
          id
      )
    },
    beforeEnter: function(el) {
      el.style.transition = "opacity 300 ease, transform 300 ease"
    },
    enter: function(el, done) {
      el.style.transform = "translateY(0)"
      el.classList.add('transition-show')
    },
    leave: function(el, done) {
      done()
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
    ...mapActions(["setPages", "setPagesPrefix", "setAnchorItem", "unsetAnchorItem"])
  },
  destroyed() {
    this.unsetAnchorItem()
  }
}
</script>

<style lang="scss">
  #services-grid {
    @include respond-to('large') {
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: fit-content(260px);
      grid-auto-flow: row dense;
      align-items: stretch;
      .image-container:first-child {
        grid-column: span 2;
        grid-row: span 2;
      }
      .text {
        grid-row: span 2;
        // min-height: 600px;
      }
    }
  }
  #services {
    margin-top: -2em;
    margin-bottom: 2em;
    .text p {
      margin-bottom: 0;
    }
    .article {
      padding: 2em 0 1.75em 0;
    }
  }
</style>
