<template>
  <Container id="business-partners">
    <PrevNextButtons :prev="prevLink" :next="nextLink" />
    <Article>
      <div class="text">
        <h1>{{ $tp("title") }}</h1>
      </div>
      <div class="box-wrapper">
        <ul>
          <li v-for="data in json.partners">
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
import json from "~/content/data/business_partners.json"
import Container from '~/components/Container'
import Article from '~/components/Article'
import PrevNextButtons from '~/components/PrevNextButtons'
import prevNext from '~/plugins/prev_next'

export default {
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('secondaryNavbar.businessPartner')}`
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/business-partners',
      de: '/uber/business-partner'
    }
  },
  mixins: [prevNext],
  components: {
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
    const page = pages[3]
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
#business-partners {
  margin: 0 auto;
  position: relative;
  width: 100vw;
  height: auto;
  #prev-next-buttons {
    a {
      width: 10vw;
      height: 100%;
      padding: .25rem .5rem;
      svg {
        position: absolute;
        top: 15vh;
      }
    }
  }
    .text {
      display: block;
      padding: 0 4em;
      margin-top: 0;
      @include respond-to('large') {
        display: none;
      }
    }
  .box-wrapper {
    height: 100%;
    width: 100%;
    @include respond-to('large') {
      width: 80%;
    }
    @include respond-to('xl') {
      width: 60%;
    }
  }
  ul {
    padding: 2em 4em;
    list-style: none;
    margin: 0;
    @include respond-to('large') {
      margin: 0;
      display: block;
      padding: 0 2em 0 0;
      columns: 22ch 2;
    }
    li {
      margin-left: 0;
      font-size: .85em;
      display: block;
      color: color(light);
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
