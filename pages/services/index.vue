<template>
  <Container id="services">
      <Article v-for="service in pages" :key="service.attributes.title" :id="formatSlug($ta(service.attributes, 'title'))">
        <div class="image-container">
          <Frame
            :source="$ta(service.attributes, 'image')"
            :title="$ta(service.attributes,'title')"
            :alt="$ta(service.attributes, 'description')"
            :style="'background-position-y:' + $ta(service.attributes, 'image_crop_y')"
            >
          </Frame>
        </div>
        <div class="text">
          <h1>{{ $ta(service.attributes, "title") }}</h1>
          <p>{{ $ta(service.attributes, "description") }}</p>
        </div>
      </Article>
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
    this.scrollIntoView()
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
            this.scrollTransitions(entry.target, 'down')
            // entry.target.firstElementChild.style.opacity = 1
            // this.$router.push({ hash: '#' + entry.target.id })
          } else {
            this.scrollTransitions(entry.target, 'up')
            // entry.target.firstElementChild.style.opacity = 0.5
          }
        })
      }, { threshold: 0.4});
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
    scrollTransitions(element, direction) {
      window.addEventListener('scroll', function() {
        // console.log(element.firstElementChild.scrollTop)
        const frame = element.firstElementChild
        if (window.scrollY > frame.offsetTop) {
          frame.style.opacity = 1 - (window.scrollY - frame.offsetTop) / frame.offsetHeight
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
  #services { margin-top: -2em; }
  #services .article {
    margin-bottom: 100px;
    padding-top: 2em;
  }
  #services .article:last-child {
    margin-bottom: 1.5em;
  }
</style>
