<template>
  <div
  id="projects"
  class="projects"
  v-on:wheel.prevent="handleScroll"
  >
    <Container>
      <ProjectsList
      class="section"
      v-if="isChunky"
      :projects="currentChunk"
      :goingUp="goingUp"
      />
      <ProjectsList
      class="section"
      id="mobile-view"
      v-if="isChunky"
      :projects="allPagesView"
      :goingUp="goingUp"
      />
    </Container>
    <ProgressBar :total="pagesChunks.length - 1" :page="pageNumber" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy } from "lodash"
import paginate from '~/plugins/paginate'
import Container from "~/components/Container"
import ProjectsList from "~/components/ProjectsList"
import ProgressBar from "~/components/ProgressBar"

export default {
  name: 'projectsIndex',
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
    this.setPages(this.currentChunk)
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
      this.setPages(chunk)
    }
  }
}
</script>

<style lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  &, & article, & .container, & .section {
    display: block;
    min-height: 100%;
    height: 100%;
    max-width: none;
  }
  .section {
    min-height: 100%;
  }
}
#mobile-view {
  display: block;
}
@include respond-to('large') {
  #mobile-view {
    display: none;
  }
}
</style>
