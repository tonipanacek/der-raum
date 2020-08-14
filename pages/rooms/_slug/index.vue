<template>
  <Container id="room">
    <Article>
      <div class="image-container">
        <Frame
          :source="cloudinaryBaseUrl + $tp('image')"
          :title="$tp('title')"
          :alt="$tp('description')"
          :style="'backgroundPositionY:' + $tp('image_crop_y')"
          v-swipe="handleSwipe"
          >
          <PrevNextButtons :prev="prevLink" :next="nextLink" />
        </Frame>
      </div>
      <div class="text">
        <h1>{{ $tp("title") }}</h1>
        <vue-markdown>{{ $tp("description") }}</vue-markdown>
      </div>
    </Article>
  </Container>
</template>

<script>
import { mapActions } from "vuex"
import { get, sortBy, isEmpty, chunk, kebabCase } from "lodash"
import dynamicSEO from '~/plugins/dynamic_seo'
import Frame from '~/components/Frame'
import Container from '~/components/Container'
import PrevNextButtons from '~/components/PrevNextButtons'
import Article from "~/components/Article"
import prevNext from '~/plugins/prev_next'
import TinyGesture from 'tinygesture';

export default {
  nuxtI18n: {
    paths: {
      en: `/rooms/:slug`,
      de: '/raume/:slug'
    }
  },
  directives: {
    swipe: {
      bind: function(el, binding) {
        const gesture = new TinyGesture(el);
        gesture.on('swiperight', function(event) {
          binding.value('right')
        });
        gesture.on('swipeleft', function(event) {
          binding.value('left')
        });
      }
    }
  },
  mixins: [prevNext, dynamicSEO],
  components: {
    Frame,
    Container,
    PrevNextButtons,
    Article
  },
  async asyncData({ app, params, error, store }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug

      // create context via webpack to map over all pages
      let allPages = await require.context(
        "~/content/rooms/",
        true,
        /\.md$/
      )
      allPages = allPages.keys().map(key => {
        // give back the value of each page context
        return allPages(key)
      })
      allPages = sortBy(allPages, page => get(page, 'attributes.position'))

      const locale = app.i18n.locale
      const page = allPages.find(p => kebabCase(get(p, `attributes.${locale}_title`)) === slug)

      await store.dispatch('i18n/setRouteParams', {
        en: { slug: kebabCase(get(page, `attributes.en_title`)) },
        de: { slug: kebabCase(get(page, `attributes.de_title`)) }
      })

      return {
        page,
        slug,
        allPages,
        pages: allPages,
        cloudinaryBaseUrl: 'https://res.cloudinary.com/dwvtvuml8/image/upload/f_auto,q_auto,dpr_auto/'
      }
    } catch (err) {
      console.debug(err)
      error({ statusCode: 404, message: "No room found" })
    }
  },
  mounted() {
    this.setPages(this.currentPagesChunk)
    this.setPagesPrefix("rooms")
  },
  computed: {
    allPagesChunks() {
      if (isEmpty(this.$data.allPages)) { return [] }
      const allPages = sortBy(this.$data.allPages, p => get(p, 'attributes.position'))
      return chunk(allPages, 3)
    },
    currentPagesChunk() {
      if (isEmpty(this.allPagesChunks)) { return [] }
      const position = parseInt(get(this.$data.page, 'attributes.position', 1))
      const pageNumber = Math.floor((position - 1) / 3)
      const chunk = this.allPagesChunks[pageNumber] || []
      return chunk.slice(0, 3)
    },
  },
  methods: {
    handleSwipe(direction) {
      if (direction === 'left') {
        this.$router.push(this.nextLink)
      } else if (direction === 'right') {
        this.$router.push(this.prevLink)
      }
    },
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>
