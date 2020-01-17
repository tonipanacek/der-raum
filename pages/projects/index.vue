<template>
  <Container id="projects">
    <ProjectsList :projects="projects" />
  </Container>
</template>

<script>
import { mapActions } from "vuex"
import { get, min, sortBy } from "lodash"
import Container from "~/components/Container"
import ProjectsList from "~/components/ProjectsList"

export default {
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
  methods: mapActions(["unsetPages"])
}
</script>
