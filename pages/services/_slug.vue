<template>
  <Container id="service">
    <article class="service">
      <Frame>
        <PrevNextButtons :prev="prevLink" :next="nextLink" />
        <img :src="$tp('image')" alt="Image of service" />
      </Frame>
      <div class="text">
        <h1>{{ $tp("title") }}</h1>
        <vue-markdown>{{ $tp("description") }}</vue-markdown>
      </div>
    </article>
  </Container>
</template>

<script>
import Container from '~/components/Container'
import Frame from '~/components/Frame'
import PrevNextButtons from '~/components/PrevNextButtons'
import prevNext from '~/plugins/prev_next'
import { mapActions } from "vuex"
export default {
  mixins: [prevNext],
  components: {
    Frame,
    Container,
    PrevNextButtons
  },
  async asyncData({ params, error }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug
      // get current page data
      const page = await import(`~/content/services/${slug}.md`)

      // create context via webpack to map over all pages
      const allPages = await require.context(
        "~/content/services/",
        true,
        /\.md$/
      )
      const pages = allPages.keys().map(key => {
        // give back the value of each page context
        return allPages(key)
      })

      return {
        page,
        slug,
        pages
      }
    } catch (err) {
      error({ statusCode: 404, message: "No service found" })
    }
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("services")
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>

<style lang="scss">
.service {
  max-width: 110ch;
  img,
  p {
    max-width: 110ch;
  }
  p {
    line-height: 2rem;
    color: color(light);
  }
  img {
    object-fit: cover;
    max-height: 70vh;
    width: 110ch;
  }
  h1 {
    @include smallCaps;
    color: color(dark);
  }
}
.text {
  padding: spacing(md);
}
</style>
