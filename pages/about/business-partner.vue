<template>
  <Container id="business-partners">
    <Article>
      <div class="text">
        <h1>Business Partner</h1>
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
import seo from "~/content/data/seo.json"
import json from "~/content/data/business_partners.json"
import Cluster from '~/components/Cluster'
import Container from '~/components/Container'
import Article from '~/components/Article'
import PrevNextButtons from '~/components/PrevNextButtons'

export default {
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('secondaryNavbar.businessPartner')}`
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/business-partner',
      de: '/uber/business-partner'
    }
  },
  businessPartners: json["partners"],
  components: {
    Cluster,
    Container,
    Article,
    PrevNextButtons
  },
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context("~/content/about/", true, /\.md$/)
    const pages = allPages.keys().map(key => {
      // give back the value of each about context
      return allPages(key)
    })
    return {
      pages: [
        ...pages,
        {
          attributes: {
            title: 'Business Partner',
            en_title: 'Business Partner',
            de_title: 'Business Partner'
          }
        }
      ],
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
  min-height: calc(100vh - 2 * #{spacing(frame)});
  margin: 0 auto;
    .text {
      display: block;
      @include respond-to('large') {
        display: none;
      }
    }
  .box-wrapper {
    height: 100%;
    width: 100%;
    margin: 0.25em;
    @include respond-to('large') {
      width: 60%;
    }
  }
  ul {
    margin-left: spacing(frame);
    padding-left: 0;
    @include respond-to('large') {
      margin: 0;
      columns: 20ch 2;
      display: block;
    }
    list-style: none;
    padding-left: 0px;
    li {
      margin-left: 0;
      font-size: .85em;
      display: block;
      color: color(dark);
      padding-bottom: spacing(xs);
    }
  }
}

</style>
