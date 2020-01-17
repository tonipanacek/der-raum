<template>
  <div id="projects" />
</template>

<script>
import { get, min, sortBy } from "lodash"

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
  }
}
</script>
