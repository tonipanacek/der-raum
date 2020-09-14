<template>
  <Container id="rooms">
    <Article v-for="room in pages" :key="room.attributes.title" :id="formatSlug($ta(room.attributes, 'title'))">
      <div class="image-container">
        <Frame
          :source="$ta(room.attributes, 'image')"
          :title="$ta(room.attributes,'title')"
          :alt="$ta(room.attributes, 'description')"
          :style="'background-position-y:' + $ta(room.attributes, 'image_crop_y')"
          >
        </Frame>
      </div>
      <div class="text">
        <h1>{{ $ta(room.attributes, "title") }}</h1>
        <p>{{ $ta(room.attributes, "description") }}</p>
      </div>
    </Article>
  </Container>
</template>

<script>
import { mapActions, mapState } from "vuex"
import { get, sortBy, isEmpty, chunk, kebabCase } from "lodash"
import dynamicSEO from '~/plugins/dynamic_seo'
import Frame from '~/components/Frame'
import Container from '~/components/Container'
import PrevNextButtons from '~/components/PrevNextButtons'
import Article from "~/components/Article"
import prevNext from '~/plugins/prev_next'

export default {
  nuxtI18n: {
    paths: {
      en: `/rooms/room`,
      de: `/raume/raum`
    }
  },
  mixins: [prevNext, dynamicSEO],
  components: {
    Frame,
    Container,
    PrevNextButtons,
    Article
  },
  async asyncData() {
    // create context via webpack to map over all pages
    const allPages = await require.context(
      "~/content/rooms/",
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
    this.setPagesPrefix("rooms")
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
  #rooms {
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
