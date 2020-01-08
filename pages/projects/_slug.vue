// this is a dynamically created template

<template>
  <article class="project"></article>
</template>
<script>
  export default {
    computed: {
    // get the slug as a param to import the correct md file
    async asyncData({ params }) {
      try {
        const locale = this.$i18n.locale;
        const projectSlug = params.slug;
        // get current project data
        let project = '';
        try {
          project = await import(`~/content/${locale}/projects/${projectSlug}.md`);
        } catch {
          // Fall back to German if no other translation provided :)
          project = await import(`~/content/de/projects/${projectSlug}.md`);
        }
        // get all project data for next route
        const allProjects = await require.context(`~/content/${locale}/projects/`, true, /\.md$/)
        return {
          sortedPaths,
          project,
          projectSlug,
          locale,
          allProjects
        }
      } catch(err) {
        console.debug(err)
        return false
      }
    }
  }
</script>
