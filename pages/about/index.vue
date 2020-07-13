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
          <Frame :source="$ta(page.attributes, 'image')" :title="$ta(page.attributes,'title')" :alt="$ta(page.attributes, 'description')">
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
import { mapActions } from "vuex"
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
      title: `${seo.shortTitle} | ${this.$t('navbarTitles.about')}`
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
    console.log(this.$i18n.locale)
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  },
  watch: {
    locale() {
      const oldHash = this.$route.hash;
      const newHash = // untranslate and retranslate to new locale
      this.$router.push({
        hash: newHash
      })
    }
  }
}
</script>

<style lang="scss">
  #about > * {
    margin-bottom: 200px;
  }
  #about .article:last-child {
    margin-bottom: 0px;
  }
</style>

