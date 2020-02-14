<template>
  <div
  id="projects"
  class="image"
  >
    <Container>
      <Article class="project">
        <NuxtLink :to="closeLink" v-if="closeLink" class="close-link">
          <img svg-inline src="~/assets/images/close.svg" alt="Close Button" class="nav close-btn" />
        </NuxtLink>
        <div class="image-container">
          <PrevNextButtons :prev="previousImageLink" :next="nextImageLink" />
          <div class="image">
            <img :src="image" :title="$tp('title')" :alt="$tp('description')">
          </div>
        </div>
        <div class="image-footer">
          <aside class="caption">
            <h1>{{ $tp('title') }} {{ id }} / {{ length }}</h1>
            <p>{{ $tp('description') }}</p>
          </aside>
          <nav class="image-nav">
            <NuxtLink :to="previousImageLink" v-if="previousImageLink">
              <img svg-inline src="~/assets/images/arrow.svg" alt="Previous Button" class="nav previous-btn" />
            </NuxtLink>
            <NuxtLink :to="nextImageLink" v-if="nextImageLink">
              <img svg-inline src="~/assets/images/arrow.svg" alt="Next Button" class="nav next-btn" />
            </NuxtLink>
            <div class="no-next" v-if="!nextImageLink"></div>
          </nav>
        </div>
      </Article>
    </Container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy, isEmpty, chunk, isEqual, kebabCase } from 'lodash'
import dynamicSEO from '~/plugins/dynamic_seo'
import Container from "~/components/Container"
import Article from "~/components/Article"
import Frame from "~/components/Frame"
import PrevNextButtons from '~/components/PrevNextButtons'
import prevNext from '~/plugins/prev_next'

export default {
  nuxtI18n: {
    paths: {
      de: '/projekte/:slug/bilder/:id',
      en: '/projects/:slug/images/:id'
    }
  },
  name: 'projectsSlug',
  mixins: [prevNext, dynamicSEO],
  async asyncData({ app, params, error, store }) {
    // get the slug as a param to import the correct md file
    try {
      // get current page data
      const slug = params.slug
      const id = parseInt(params.id)

      // create context via webpack to map over all pages
      let allPages = await require.context(
        "~/content/projects/",
        true,
        /\.md$/
      )
      allPages = allPages.keys().map(key => {
        // give back the value of each page context
        return allPages(key)
      })

      const locale = app.i18n.locale
      const page = allPages.find(p => kebabCase(get(p, `attributes.${locale}_title`)) === slug)

      await store.dispatch('i18n/setRouteParams', {
        en: { slug: kebabCase(get(page, `attributes.en_title`)) },
        de: { slug: kebabCase(get(page, `attributes.de_title`)) }
      })

      const images = get(page, 'attributes.images', [])
      const image = images[id - 1]

      if (!image) {
        throw "No image found!"
      }

      return {
        image,
        images,
        pages: images,
        allPages,
        page,
        slug,
        id
      }
    } catch (err) {
      console.debug(err)
      error({ statusCode: 404, message: "No image found" })
    }
  },
  mounted() {
    this.setPages(this.allPagesCurrentChunk)
    this.setPagesPrefix("projects")
    window.addEventListener('load', this.makeMobileFullScreen)
    window.addEventListener("keyup", this.handleKey)
  },
  destroyed() {
    window.removeEventListener('load', this.makeMobileFullScreen)
    window.removeEventListener("keyup", this.handleKey)
  },
  methods: {
    handleKey(event) {
      event.preventDefault();
      if (event.key.match(/(down|right)/i) && this.nextImageLink) {
        this.$router.push(this.nextImageLink)
        return false;
      } else if (event.key.match(/(up|left)/i) && this.previousImageLink) {
        this.$router.push(this.previousImageLink)
        return false;
      } else if (event.key.match(/esc/i) && this.closeLink) {
        this.$router.push(this.closeLink)
        return false
      }
    },
    makeMobileFullScreen(event) {
      console.log("hi")
      // if (window.width <= 767) {
      //   const navbar = document.querySelector('.left-sidebar')
      //   const footer = document.querySelector('.right-sidebar')
      //   navbar.style.display = "none"
      //   footer.style.display = "none"
      // } else {
      //   console.log("desktop screen")
      //   return true
      // }
    },
    ...mapActions(["setPages", "setPagesPrefix"])
  },
  computed: {
    nextImageLink() {
      if (!this.length) { return '' }
      if (this.id >= this.length) { return '' }
      return this.localePath({
        name: 'projects-slug-images-id',
        params: {
          slug: this.$data.slug,
          id: this.$data.id + 1
        }
      })
    },
    previousImageLink() {
      if (!this.length) { return '' }
      if (parseInt(this.id) <= 1) { return '' }
      return this.localePath({
        name: 'projects-slug-images-id',
        params: {
          slug: this.$data.slug,
          id: this.$data.id - 1
        }
      })
    },
    closeLink() {
      return this.localePath({
        name: 'projects-slug',
        params: {
          slug: this.$data.slug
        }
      })
    },
    allPagesChunks() {
      if (isEmpty(this.$data.allPages)) { return [] }
      const allPages = sortBy(this.$data.allPages, [p => get(p, 'attributes.page'), p => get(p, 'attributes.page_position')])
      const chunks = chunk(allPages, 3)
      return chunks.map(chunk => [chunk[1], chunk[0], chunk[2]])
    },
    allPagesCurrentChunk() {
      if (isEmpty(this.allPagesChunks)) { return [] }
      let chunk = this.allPagesChunks[get(this.$data.page, 'attributes.page', 1) - 1] || []
      return chunk.slice(0, 3)
    },
    length() {
      if (isEmpty(this.$data.pages)) { return 0 }
      return this.$data.pages.length
    }
  },
  components: {
    Container,
    Article,
    PrevNextButtons,
    Frame
  }
}
</script>

<style lang="scss" scoped>
.project {
  position: relative;
  .image-container {
    position: relative;
    @include respond-to('large') {
      max-height: calc(100vh - 2 * #{spacing(frame)});
      position: static;
    }
    .image {
      display: flex;
      justify-content: space-around;
    }
  }
  img {
    height: 80vh;
  }

  h1 {
    @include smallCaps;
    color: color(dark);
  }
  p {
    @include smallCaps;
    color: color(light);
    font-size: 0.8em;
  }
  .image-footer {
    display: flex;
    align-items: flex-start;
    width: 100%;
    .caption {
      flex-grow: 2;
      padding: spacing(md);
      @include respond-to(large) {
        padding: 0;
      }
      h1 {
        margin-top: 0;
      }
    }
  }
  .close-link {
    display: none;
    position: absolute;
    left: -20px;
    top: -3px;
    .close-btn {
      height: .8em;
    }
  }
  .nav {
    height: 1rem;
    fill: color(light);
    &:hover {
      fill: color(dark);
    }
  }
  .image-nav {
    margin-right: spacing(md);
    display: none;
    @include respond-to('large') {
      display: block;
    }
  }
  .previous-btn {
    -webkit-transform:rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
    margin-right: spacing(sm);
  }
  @include respond-to('large') {
    .close-link {
      display: block;
    }
    .image-nav {
      margin-right: 0;
    }
  }
  .no-next {
    height: 1rem;
    width: 2.25rem;
  }
}
</style>
