<template>
  <Container id="about">
    <Article v-for="page in pages" :key="page.attributes.title" :id="formatSlug($ta(page.attributes, 'title'))">
      <template v-if="page.attributes.text_and_link_group">
        <div class="text">
          <h1>{{ $ta(page.attributes, "title") }}</h1>
          <ul class="link-list">
            <li v-for="data in page.attributes.text_and_link_group">
              <template v-if="data.text_url">
                <a :href="data.text_url" target="_blank">{{ data.main_text }}</a>
              </template>
              <template v-else>
                {{ data.main_text }}
              </template>
            </li>
          </ul>
        </div>
      </template>
      <template v-else>
        <div class="image-container">
          <Frame
            :source="$ta(page.attributes, 'image')"
            :title="$ta(page.attributes,'title')"
            :alt="$ta(page.attributes, 'description')"
            :style="'background-position-y:' + $ta(page.attributes, 'image_crop')">
          </Frame>
        </div>
        <div class="text">
          <h1>{{ $ta(page.attributes, "title") }}</h1>
          <p>{{ $ta(page.attributes, "description") }}</p>
        </div>
      </template>
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
      en: '/about',
      de: '/uber'
    }
  },
  components: {
    Article,
    Frame,
    Container
  },
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar_titles.about')}`
    }
  },
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context(
      "~/content/about/",
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
    this.setPagesPrefix("about")
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
            if (entry.target.firstElementChild.className === 'text') {
              entry.target.style.opacity = 1
            } else {
              this.scrollTransitions(entry.target)
            }
            // this.$router.push({ hash: '#' + entry.target.id })
          } else {
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
#about {
  margin-top: -2em;
  margin-bottom: 2em;
  .text p {
    margin-bottom: 0;
  }
  .article {
    padding: 2em 0 1.75em 0;
  }
  #business-partners, #business-partner {
    .text {
      margin-top: 0;
    }
  }
}
</style>

