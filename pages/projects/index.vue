<template>
  <Container>
    <div
    id="projects-desktop"
    class="projects"
    v-on:wheel.prevent="handleScroll"
    >
      <ProjectsList
      class="section"
      id="desktop-view"
      v-if="isChunky"
      :projects="currentChunk"
      :goingUp="goingUp"
      :mobile="false"
      @increment="incrementPage"
      />
      <ProgressBar :total="pagesChunks.length - 1" :page="pageNumber" @increment="incrementPage" @decrement="decrementPage" />
    </div>
    <div
    id="projects-mobile"
    class="projects"
    >
      <ProjectsList
      class="section"
      id="mobile-view"
      v-if="isChunky"
      :projects="allPagesView"
      :goingUp="goingUp"
      :mobile="true"
      />
    </div>
  </Container>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy } from "lodash"
import seo from '~/content/data/seo'
import paginate from '~/plugins/paginate'
import Container from "~/components/Container"
import ProjectsList from "~/components/ProjectsList"
import ProgressBar from "~/components/ProgressBar"

export default {
  name: 'projectsIndex',
  scrollToTop: false,
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar.projects')}`
    }
  },
  nuxtI18n: {
    paths: {
      de: '/projekte',
      en: '/projects'
    }
  },
  mixins: [paginate],
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context(
      "~/content/projects/",
      true,
      /\.md$/
    )
    let pages = allPages.keys().map(key => {
      // give back the value of each page context
      return allPages(key)
    })
    pages = sortBy(pages, page => get(page, 'attributes.page'))
    return {
      pages
    }
  },
  components: {
    Container,
    ProjectsList,
    ProgressBar
  },
  mounted() {
    this.setPages(this.currentChunk.slice(0, this.max - 1))
    this.setPagesPrefix("projects")
  },
  methods: {
    getTitle(chunk) {
      return this.formatSlug(get(chunk, '[0].attributes.title', ''))
    },
    ...mapActions(["setPages", "setPagesPrefix"])
  },
  watch: {
    currentChunk(chunk) {
      this.setPages(this.currentChunk.slice(0, this.max - 1))
    }
  }
}
</script>

<style lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  width: 100%;
  &, & article, & .container, & .section {
    // display: block;
    // max-width: none;
  }
}
#mobile-view {
  display: block;
}
#desktop-view {
  display: none;
  position: relative;
}
@include respond-to('large') {
  #mobile-view {
    display: none;
  }
  #desktop-view {
  display: block;
  }
}
</style>
