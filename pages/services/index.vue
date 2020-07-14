<template>
  <Container id="services">
    <Article v-for="service in pages" :key="service.attributes.title" :id="formatSlug($ta(service.attributes, 'title'))">
      <div class="image-container">
        <Frame
          :source="$ta(service.attributes, 'image')"
          :title="$ta(service.attributes,'title')"
          :alt="$ta(service.attributes, 'description')"
          :style="'background-position-y:' + $ta(service.attributes, 'image_crop')"
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
import { mapActions } from "vuex"
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
      console.log(this)
      this.$router.push({
        hash: newHash
      })
    }
  }
}
</script>

<style lang="scss">
  #services > * {
    margin-bottom: 100px;
  }
  #services .article:last-child {
    margin-bottom: 0px;
  }
</style>
