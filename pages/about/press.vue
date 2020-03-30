<template>
  <Container id="press">
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
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context("~/content/about/", true, /\.md$/)
    let pages = allPages.keys().map(key => {
      // give back the value of each about context
      return allPages(key)
    })
    pages = sortBy(pages, page => get(page, 'attributes.position'))
    return {
      pages,
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
  @include respond-to('large') {
    min-height: calc(100vh - 2 * #{spacing(frame)});
  }
  .text {
    display: block;
    padding: 0 2em;
    @include respond-to('large') {
      display: none;
    }
  }
  .box-wrapper {
    height: 100%;
    width: 100%;
    // @include respond-to('large') {
    //   width: 100%;
    // }
  }
  ul {
    padding: 2em;
    list-style: none;
    margin: 0;
    @include respond-to('large') {
      margin: 0;
      display: block;
      padding: 0 2em 0 0;
      // columns: 22ch 2;
    }
    li {
      margin-left: 0;
      font-size: .85em;
      display: block;
      padding-bottom: spacing(xs);
      a {
        color: color(dark);
        transition: color 100ms ease;
        &:hover {
          color: color(dark);
          font-weight: 600;
        }
      }
    }
  }
  // a,
  // a:focus,
  // a:visited {
  //   transition: color 500ms ease, font-weight 100ms ease-in-out;
  //   text-decoration: none;
  //   color: color(dark);
  //   outline: 0;
  //   &:hover {
  //     color: color(dark);
  //     font-weight: 400;
  //   }
  // }
}

</style>
