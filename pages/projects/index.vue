<template>
  <Container id="projects">
  <full-page ref="fullpage" id="fullpage" :options="options" v-if="arePages">
    <div :id="`section${index}` "class="section" v-for="(pagesChunk, index) in pagesChunks" :key="$ta(pagesChunk, '[0].attributes.title')">
        <ProjectsList :projects="pagesChunk" />
      </div>
    </full-page>
  </Container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { sortBy, chunk, isEmpty } from "lodash"
import Container from "~/components/Container"
import ProjectsList from "~/components/ProjectsList"

export default {
  name: 'projectsIndex',
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
  components: {
    Container,
    ProjectsList
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("projects")
  },
  data() {
    return {
      max: 4, // max number of items to display on a page
      options: {
        licenseKey: "8E8983DA-2BD74A92-8EACC54D-C72F427E",
        controlArrows: true,
        scrollBar: true,
        anchors: this.pagesChunks ? this.pagesChunks.map((page, index) => `section${index}`) : []
      }
    }
  },
  computed: {
    pagesChunks() {
      return chunk(this.sortedPages, this.max)
    },
    arePages() {
      return !isEmpty(this.sortedPages)
    },
    ...mapGetters(['sortedPages'])
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>
