<template>
  <Container id="projects" @scroll="handleScroll">
    <ProjectsList :projects="paginated" />
  </Container>
</template>

<script>
import { mapActions } from "vuex"
import { get, min, sortBy } from "lodash"
import paginate from "~/plugins/paginate"
import Container from "~/components/Container"
import ProjectsList from "~/components/ProjectsList"

export default {
  mixins: paginate,
  async asyncData() {
    // create context via webpack to map over all blog projects
    const allProjects = await require.context(
      "~/content/projects/",
      true,
      /\.md$/
    )
    let projects = allProjects.keys().map(key => {
      // give back the value of each project context
      return allProjects(key)
    })
    projects = sortBy(projects, project => project.position)
    return {
      projects
    }
  },
  components: {
    Container,
    ProjectsList
  },
  mounted() {
    this.unsetPages()
  },
  data() {
    return {
      max: 4 // max number of items to display on a page
    }
  },
  computed: {
    paginated() {
      return this.$data.projects.slice(this.page, this.max)
    }
  },
  methods: {
    handleScroll(event) {
      console.log(event);
    },
    ...mapActions(['unsetPages'])
  }
}
</script>
