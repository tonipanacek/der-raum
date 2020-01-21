<template>
  <Container id="projects">
    <ProjectsList :projects="paginatedPages" />
  </Container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { get, min, sortBy } from "lodash"
import Container from "~/components/Container"
import ProjectsList from "~/components/ProjectsList"

export default {
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
      max: 4 // max number of items to display on a page
    }
  },
  computed: {
    ...mapGetters(['paginatedPages'])
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix"])
  }
}
</script>
