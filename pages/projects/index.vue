<template>
  <Container>
    <h1 class="accessible">{{ seo.projectsOverviewH1 }}</h1>
    <p class="accessible">{{ seo.projectsOverviewText }}</p>
    <ProjectsList
    class="section"
    id="mobile-view"
    v-if="isChunky"
    :projects="allPagesView"
    :goingUp="goingUp"
    :mobile="true"
    />
  </Container>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy } from "lodash"
import seo from '~/content/data/seo'
import paginate from '~/plugins/paginate'
import Container from "~/components/Container"
import ProjectsList from "~/components/ProjectsList"

export default {
  name: 'projectsIndex',
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar_titles.projects')}`
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
    pages = pages.filter(page => page.attributes.online)
    pages = sortBy(pages, page => get(page, 'attributes.group'))
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
    this.setPages(this.currentChunk.slice(0, this.max - 1))
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

<style lang="scss">
#mobile-view {
  display: block;
}
</style>
