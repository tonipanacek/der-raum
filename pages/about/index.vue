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
            entry.target.firstElementChild.style.opacity = 1
            this.setAnchorItem(entry.target.id)
            // this.$router.push({ hash: '#' + entry.target.id })
            this.addParamsToLocation(entry.target.id)
          } else if (entry.target.firstElementChild.className === 'text') {
            entry.target.style.opacity = 1
          } else {
            entry.target.firstElementChild.style.opacity = 0.5
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
    ...mapActions(["setPages", "setPagesPrefix", "setAnchorItem", "unsetAnchorItem"])
  },
  destroyed() {
    this.unsetAnchorItem()
  }
}
</script>

<style lang="scss">
  #about { margin-top: -2em; }
  #about .article {
    margin-bottom: 100px;
    padding-top: 2em;
    .image-container {
      transition: opacity 300ms ease;
    }
  }
  #about .article:last-child {
    margin-bottom: 0px;
    padding-top: 0;
  }
</style>

