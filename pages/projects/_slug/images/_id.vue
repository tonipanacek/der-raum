<template>
  <div
  id="projects"
  class="image">
    <Container>
      <Article class="project" v-swipe="handleSwipe">
        <NuxtLink :to="closeLink" v-if="closeLink" class="close-link">
          <img svg-inline src="~/assets/images/X_thick_2.svg" alt="Close Button" class="nav close-btn" />
        </NuxtLink>
        <div class="image-container" :style="{ backgroundImage: `url(${image})` }" :class="imageOrientation">
          <PrevNextButtons :prev="previousImageLink" :next="nextImageLink" id="image-gallery"/>
        </div>
        <div class="image-footer">
          <aside class="caption">
            <h1>{{ $tp('title') }} <span id="image-count">{{ id }} / {{ length }}</span></h1>
            <p>{{ $tp('description') }}</p>
          </aside>
          <nav class="image-nav">
            <NuxtLink :to="previousImageLink" v-if="previousImageLink" class="prev">
              <img svg-inline src="~/assets/images/rightarrow_thin_3.svg" alt="Previous Button" class="nav previous-btn" />
            </NuxtLink>
            <NuxtLink :to="nextImageLink" v-if="nextImageLink" class="next">
              <img svg-inline src="~/assets/images/rightarrow_thin_3.svg" alt="Next Button" class="nav next-btn" />
            </NuxtLink>
            <div class="no-next right" v-if="!nextImageLink">
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
import PrevNextButtons from '~/components/PrevNextButtons'
import prevNext from '~/plugins/prev_next'
import TinyGesture from 'tinygesture';

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

      allPages = sortBy(allPages, [p => get(p, 'attributes.page'), p => get(p, 'attributes.page_position')])

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
    this.setDocHeight()
    this.enterMobileFullScreen()
  },
  destroyed() {
    window.removeEventListener("keyup", this.handleKey)
  },
  methods: {
    enterMobileFullScreen() {
      const navbar = document.querySelector('.left-sidebar')
      const footer = document.querySelector('#right-sidebar')
      const closeLink = document.querySelector('.close-link')
      const mainContainer = document.querySelector('.main-container')
      const imageContainer = document.querySelector('.image-container')
      const body = document.querySelector('body');
      const layout = document.querySelector('.layout')
      const hideSidebars = () => {
        navbar.style.display = 'none'
        footer.style.display = 'none'
        layout.style.paddingTop = '0'
        closeLink.style.left = '15px'
        closeLink.style.top = '15px'
        mainContainer.classList.remove('mt-lg')
        body.classList.add('no-scroll')
      }
      const showSidebars = () => {
        navbar.style.display = 'flex'
        footer.style.display = 'flex'
        closeLink.style.left = '-35px'
        closeLink.style.top = '0px'
        layout.style.paddingTop = '2em'
        mainContainer.classList.add('mt-lg')
        body.classList.remove('no-scroll')
      }
      const widthChange = (mq) => {
        if ((this.$route.path.includes('bilder') || this.$route.path.includes('images')) && mq.matches) {
          hideSidebars();
          closeLink.addEventListener('click', showSidebars);
          window.addEventListener('resize', this.setDocHeight)
          window.addEventListener('orientationchange', this.setDocHeight)
        } else {
          showSidebars();
        }
      }
      const mq = window.matchMedia( "(max-width: 1024px)" );
      mq.addListener(widthChange);
      widthChange(mq);
    },
    setDocHeight() {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
        document.querySelector('body').style.height = window.innerHeight + 'px';
        document.querySelector('#projects').style.height = window.innerHeight + 'px';
        // document.querySelector('.image-container').style.height = window.innerHeight + 'px';
    },
    handleSwipe(direction) {
      if (direction === 'left') {
        this.$router.push(this.nextImageLink)
      } else if (direction === 'right') {
        this.$router.push(this.previousImageLink)
      }
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
      const projectIndex = this.$data.allPages.indexOf(this.$data.page)
      const nextProject = this.$data.allPages[projectIndex + 1]
      if (this.id >= this.length && projectIndex === this.$data.allPages.length - 1) {
        return ''
      } else if (this.id >= this.length) {
        const nextSlug = this.formatSlug(this.$ta(nextProject.attributes, 'title'))
        return this.localePath({
          name: 'projects-slug-images-id',
          params: {
            slug: nextSlug,
            id: 1
          }
        })
      } else {
        return this.localePath({
          name: 'projects-slug-images-id',
          params: {
            slug: this.$data.slug,
            id: this.$data.id + 1
          }
        })
      }

    },
    previousImageLink() {
      if (!this.length) { return '' }
      const projectIndex = this.$data.allPages.indexOf(this.$data.page)
      const previousProject = this.$data.allPages[projectIndex - 1]
      if (parseInt(this.id) <= 1 && projectIndex === 0) {
        return ''
      } else if (parseInt(this.id) <= 1) {
        const previousSlug = this.formatSlug(this.$ta(previousProject.attributes, 'title'))
        return this.localePath({
          name: 'projects-slug-images-id',
          params: {
            slug: previousSlug,
            id: previousProject.attributes.images.length
          }
        })
      } else {
        return this.localePath({
          name: 'projects-slug-images-id',
          params: {
            slug: this.$data.slug,
            id: this.$data.id - 1
          }
        })
      }

    },
    closeLink() {
      return this.localePath({
        name: 'projects'
      })
    },
    allPagesChunks() {
      if (isEmpty(this.$data.allPages)) { return [] }
      const allPages = sortBy(this.$data.allPages, [p => get(p, 'attributes.page'), p => get(p, 'attributes.page_position')])
      const chunks = chunk(allPages, 3)
      return chunks.map(chunk => [chunk[0], chunk[1], chunk[2]])
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
      if (process.client) {
        if (!this.$data.image) { return '' }
        let emptyImage = new Image()
        emptyImage.src = this.$data.image
        return emptyImage.width > emptyImage.height ? 'landscape' : 'portrait'
      }
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
#projects {
  @include respond-to('large') {
    max-height: 90vh;
  }
}
#projects.image {
  max-width: 1250px;
  margin: 0 auto;
  height: 100%;
  #prev-next-buttons {
    a,
    a:visited,
    a:focus {
      .arrow {
        @include respond-to('large') {
          opacity: 0;
        }
      }
    }
  }
}
.project {
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto 0;
  @include respond-to('large') {
    max-height: calc(100vh - 2 * #{spacing(frame)});
  }
  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
    // height: calc(var(--vh, 1vh) * 100);
    // height: 90vh;
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
      bottom: 0px;
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
        font-size: 0.8rem;
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
      fill: color(black);
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
    // this width needs to be the same in the no-next class
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
    width: 20%;
    text-align: right;
    @include respond-to('large') {
      display: block;
    }
    .prev { padding-right: .5rem; }
  }
  .previous-btn {
    transform: scaleX(-1);
  }
  .no-next {
    visibility: hidden;
    display: inline-block;
    width: 1rem;
  }
}
</style>
