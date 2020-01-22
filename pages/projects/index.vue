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
      />
    </Container>
    <ProgressBar :total="pagesChunks.length - 1" :page="page" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    pages = sortBy(pages, page => page.position)
    return {
      pages
    }
  },
  computed : {
    ...mapGetters({
      pages: 'sortedPages'
    })
  },
  components: {
    Container,
    ProjectsList,
    ProgressBar
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("projects")
  },
  methods: {
    getTitle(chunk) {
      return this.formatSlug(get(chunk, '[0].attributes.title', ''))
    },
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.section {
  min-height: 100%;
}
</style>
