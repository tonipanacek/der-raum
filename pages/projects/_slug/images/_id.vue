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
          <img :src="image" :alt="$tp('title')">
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
          </nav>
        </div>
      </Article>
    </Container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy, isEmpty, chunk, isEqual } from 'lodash'
import Container from "~/components/Container"
import Article from "~/components/Article"
import PrevNextButtons from '~/components/PrevNextButtons'
import prevNext from '~/plugins/prev_next'

export default {
  name: 'projectsSlug',
  mixins: [prevNext],
  async asyncData({ params, error }) {
    // get the slug as a param to import the correct md file
    try {
      // get current page data
      const slug = params.slug
      const id = parseInt(params.id)
      const page = await import(`~/content/projects/${slug}.md`)
      const images = get(page, 'attributes.images', [])
      const image = images[id - 1]

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
    window.addEventListener("keyup", this.handleKey)
  },
  destroyed() {
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
      }
    },
    ...mapActions(["setPages", "setPagesPrefix"])
  },
  computed: {
    nextImageLink() {
      if (!this.length) { return '' }
      if (this.id >= this.length) { return '' }
      return this.localePath({
        name: 'projects-slug-images-id',
        slug: this.$data.slug,
        id: this.$data.id + 1
      })
    },
    previousImageLink() {
      if (!this.length) { return '' }
      if (this.id <= 1) { return '' }
      return this.localePath({
        name: 'projects-slug-images-id',
        slug: this.$data.slug,
        id: this.$data.id - 1
      })
    },
    closeLink() {
      return `/projects/${this.$data.slug}/`
      return this.localePath({
        name: 'projects-slug',
        slug: this.$data.slug
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
      const chunk = this.allPagesChunks[get(this.$data.page, 'attributes.page', 1) - 1] || []
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
    PrevNextButtons
  }
}
</script>

<style lang="scss" scoped>
.image {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.image-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  max-height: calc(100vh - 2 * #{spacing(frame)});;
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
  font-size: 0.7em;
}
.image-footer {
  display: flex;
  align-items: flex-start;
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
  position: fixed;
  left: 1rem;
  .close-btn {
    height: .8em;
  }
}
.nav {
  // display: block;
  height: 1rem;
  fill: color(light);
  &:hover {
    fill: color(dark);
  }
}
.image-nav {
  margin-right: spacing(md);
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
    left: 18em;
  }
  .image-nav {
    margin-right: 0;
  }
}
</style>
