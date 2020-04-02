<template>
  <Container id="press">
    <PrevNextButtons :prev="prevLink" :next="nextLink" />
    <Article>
      <div class="text">
        <h1>Press</h1>
      </div>
      <div class="box-wrapper">
        <ul>
          <li v-for="data in json.press">
            <template v-if="data.url">
              <a :href="data.url" target="_blank">{{ data.text }}</a>
            </template>
            <template v-else>
              {{ data.text }}
            </template>
          </li>
        </ul>
      </div>
    </Article>
  </Container>
</template>

<script>
import { mapActions } from 'vuex'
import { get, sortBy } from "lodash"
import seo from "~/content/data/seo.json"
import json from "~/content/data/press.json"
import Cluster from '~/components/Cluster'
import Container from '~/components/Container'
import Article from '~/components/Article'
import PrevNextButtons from '~/components/PrevNextButtons'
import prevNext from '~/plugins/prev_next'

export default {
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('secondaryNavbar.press')}`
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/press',
      de: '/uber/presse'
    }
  },
  components: {
    Cluster,
    Container,
    Article,
    PrevNextButtons
  },
  mixins: [prevNext],
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context("~/content/about/", true, /\.md$/)
    let pages = allPages.keys().map(key => {
      // give back the value of each about context
      return allPages(key)
    })
    pages = sortBy(pages, page => get(page, 'attributes.position'))
    const page = pages[4]
    return {
      pages,
      page,
      json: json
    }
  },
  mounted() {
    this.setPages(this.$data.pages)
    this.setPagesPrefix("about")
  },
  methods: {
    ...mapActions(['setPages', 'setPagesPrefix'])
  }
}
</script>
<style lang="scss">
#press {
  height: auto;
  margin: 0 auto;
  position: relative;
  @include respond-to('large') {
    min-height: calc(100vh - 2 * #{spacing(frame)});
  }
  #prev-next-buttons a {
    height: auto;
    padding: .25rem .5rem;
  }
  .article {
    padding: 0 2em;
  }
  .text {
    display: block;
    padding: 0 2em;
    margin-top: 0;
    @include respond-to('large') {
      display: none;
    }
  }
  .box-wrapper {
    height: 100%;
    width: 100%;
  }
  ul {
    padding: 2em;
    list-style: none;
    margin: 0;
    @include respond-to('large') {
      margin: 0;
      display: block;
      padding: 0 2em 0 0;
    }
    li {
      margin-left: 0;
      font-size: .85em;
      display: block;
      padding-bottom: spacing(xs);
      a {
        color: color(dark);
        transition: font-weight 100ms ease;
        &:hover {
          color: color(dark);
          font-weight: 600;
        }
      }
    }
  }
}

</style>
