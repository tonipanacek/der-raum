<template>
  <Container>
    <h1 class="accessible">{{ seo.projectsOverviewH1 }}</h1>
    <p class="accessible">{{ seo.projectsOverviewText }}</p>
    <ProjectsList
    :projects="pages"
    />
  </Container>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy } from "lodash"
import seo from '~/content/data/seo'
import Container from "~/components/Container"
import ProjectsList from "~/components/ProjectsList"

export default {
  layout: 'layout',
  name: 'index',
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar_titles.projects')}`
    }
  },
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
    pages = pages.filter(page => page.attributes.online)
    pages = sortBy(pages, [page => get(page, 'attributes.group'), page => get(page, 'attributes.group_position')])
    return {
      pages,
      seo
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
  destroyed() {
    this.resetLastPage()
  },
  methods: {
    ...mapActions(["setPages", "setPagesPrefix", "resetLastPage"])
  },
}
</script>
