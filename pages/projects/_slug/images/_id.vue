<template>
  <div
  id="projects"
  class="image">
    <Container>
      <Article class="project">
        <NuxtLink :to="closeLink" v-if="closeLink" class="close-link">
          <img svg-inline src="~/assets/images/X_thick.svg" alt="Close Button" class="nav close-btn" />
          <!-- <p>schließen</p> -->
        </NuxtLink>
        <div class="image-container" :style="{ backgroundImage: `url(${image})` }" :class="imageOrientation">
          <PrevNextButtons :prev="previousImageLink" :next="nextImageLink" />
        </div>
        <div class="image-footer">
          <aside class="caption">
            <h1>{{ $tp('title') }} <span id="image-count">{{ id }} / {{ length }}</span></h1>
            <p>{{ $tp('description') }}</p>
          </aside>
          <nav class="image-nav">
            <div class="no-next" v-if="!previousImageLink">
            </div>
            <NuxtLink :to="previousImageLink" v-if="previousImageLink">
              <img svg-inline src="~/assets/images/rightarrow_thin.svg" alt="Previous Button" class="nav previous-btn" />
            </NuxtLink>
            <NuxtLink :to="nextImageLink" v-if="nextImageLink">
              <img svg-inline src="~/assets/images/rightarrow_thin.svg" alt="Next Button" class="nav next-btn" />
            </NuxtLink>
            <div class="no-next" v-if="!nextImageLink">
            </div>
          </nav>
        </div>
      </Article>
    </Container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy, isEmpty, chunk, isEqual, kebabCase, flatten } from 'lodash'
import dynamicSEO from '~/plugins/dynamic_seo'
import Container from "~/components/Container"
import Article from "~/components/Article"
import Frame from "~/components/Frame"
import PrevNextButtons from '~/components/PrevNextButtons'
import prevNext from '~/plugins/prev_next'

export default {
  transition: 'something',
  nuxtI18n: {
    paths: {
      de: '/projekte/:slug/bilder/:id',
      en: '/projects/:slug/images/:id'
    }
  },
  props: {
    mobile: Boolean,
    orientation: String
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

      let images = get(page, 'attributes.images', [])
      images = chunk(images, 3)
      images = images.map(chunk => {
        if (images.indexOf(chunk) === 0) {
          const firstThree = chunk.slice(0,3)
          return firstThree
        } else {
          let portrait = chunk.slice(0,1)
          let rest = chunk.slice(1)
          rest.splice(1, 0, portrait.join(''))
          return rest
        }
      })
      images = flatten(images)
      const image = images[id - 1]

      if (!image) {
        throw "No image found!"
      }

      return {
        image,
        images,
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
    this.setPages(this.currentPagesChunk)
    this.setPagesPrefix("projects")
    window.addEventListener("keyup", this.handleKey)
    this.enterMobileFullScreen()
    window.addEventListener("resize", this.resetHeight);
  },
  destroyed() {
    window.removeEventListener("keyup", this.handleKey)
  },
  methods: {
    resetHeight(){
      // reset the body height to that of the inner browser
      document.body.style.height = window.innerHeight + "px";
    },
    enterMobileFullScreen() {
      const navbar = document.querySelector('.left-sidebar')
      const footer = document.querySelector('#right-sidebar')
      const closeLink = document.querySelector('.close-link')
      const mainContainer = document.querySelector('.main-container')
      const layout = document.querySelector('.layout')
      const hideSidebars = () => {
        navbar.style.display = 'none'
        footer.style.display = 'none'
        layout.style.paddingTop = '0'
        closeLink.style.left = '15px'
        closeLink.style.top = '15px'
        mainContainer.classList.remove('mt-lg')
      }
      const showSidebars = () => {
        navbar.style.display = 'flex'
        footer.style.display = 'flex'
        closeLink.style.left = '-35px'
        closeLink.style.top = '0px'
        layout.style.paddingTop = '2em'
        mainContainer.classList.add('mt-lg')
      }
      const setDocHeight = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
      }
      const widthChange = (mq) => {
        if (mq.matches && (this.$route.path.includes('bilder') || this.$route.path.includes('images'))) {
          hideSidebars();
          closeLink.addEventListener('click', showSidebars);
          window.addEventListener('resize', setDocHeight)
          window.addEventListener('orientationchange', setDocHeight)
        } else {
          showSidebars();
        }
      }
      const mq = window.matchMedia( "(max-width: 870px)" );
      mq.addListener(widthChange);
      widthChange(mq);
    },
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
    currentPagesChunk() {
      if (isEmpty(this.allPagesChunks)) { return [] }
      let chunk = this.allPagesChunks[get(this.$data.page, 'attributes.page', 1) - 1] || []
      return chunk.slice(0, 3)
    },
    length() {
      if (isEmpty(this.$data.images)) { return 0 }
      return this.$data.images.length
    },
    imageOrientation() {
      if (!this.$data.image) { return '' }
      let emptyImage = new Image()
      emptyImage.src = this.$data.image
      return emptyImage.width > emptyImage.height ? 'landscape' : 'portrait'
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
#projects.image {
max-width: 1250px;
margin: 0 auto;
}
.project {
  position: relative;
  width: 100%;
  margin: auto 0;
  @include respond-to('large') {
    max-height: calc(100vh - 2 * #{spacing(frame)});
  }
  .image-container {
    position: relative;
    width: 100%;
    // height: 90vh;
    height: calc(var(--vh, 1vh) * 100);
    background-position: center;
    background-repeat: no-repeat;
    &.landscape {
      background-size: contain;
    }
    &.portrait {
      background-size: cover;
    }
    @media (orientation: landscape) {
      &.landscape {
        background-size: cover;
      }
      &.portrait {
        background-size: contain;
      }
    }
    @include respond-to('large') {
      &.landscape {
      background-size: contain;
      }
      &.portrait {
        background-size: contain;
      }
      height: 85vh;
      background-position: top;
      position: static;
    }
    .image {
      display: flex;
      justify-content: space-around;
    }
  }
  .image-footer {
    display: flex;
    align-items: flex-start;
    width: 100%;
    position: absolute;
    bottom: 0px;
    padding: spacing(md);
    @include respond-to('large') {
      position: inherit;
      margin-top: spacing(frame);
      padding: 0;
    }
    .caption {
      flex-grow: 1;
      h1 {
        @include smallCaps;
        color: color(black);
        margin-top: 0;
      }
      p {
        @include smallCaps;
        color: color(light);
        font-size: 0.8em;
        margin-bottom: 0;
      }
      #image-count {
        padding-left: .75em;
      }
    }
  }
  .close-link {
    position: absolute;
    left: -35px;
    top: 0px;
    z-index: 10;
    .close-btn {
      height: 1rem;
      width: 1.1rem;
      fill: color(dark);
      @media(hover: hover) and (pointer: fine) {
        &:hover {
          fill: color(black);
        }
      }
      &:focus {
        outline: none;
      }
    }
  }
  .nav {
    height: 1.5rem;
    fill: color(dark);
    width: 1rem;
    &:focus {
      outline: none;
    }
    @media(hover: hover) and (pointer: fine) {
      &:hover {
        fill: color(black);
      }
    }
  }
  .image-nav {
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
  .no-next {
    visibility: hidden;
    display: inline-block;
    width: .8em;
  }
}
</style>
