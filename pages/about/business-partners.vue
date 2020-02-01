<template>
  <Container id="business-partners">
    <Article>
      <Cluster class="md">
        <div class="box-wrapper">
          <ul>
            <li v-for="data in $options.businessPartners">{{data}}</li>
          </ul>
        </div>
      </Cluster>
    </Article>
  </Container>
</template>

<script>
import { mapActions } from 'vuex'
import json from "~/content/data/business_partners.json"
import Cluster from '~/components/Cluster'
import Container from '~/components/Container'
import Article from '~/components/Article'

export default {
  businessPartners: json["partners"],
  components: {
    Cluster,
    Container,
    Article
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
            title: 'Business Partners',
            en_title: 'Business Partners',
            de_title: 'Geschäftspartner'
          }
        }
      ]
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
  height: calc(100vh - 2 * #{spacing(lg)});
  margin: 0 auto;
  .box-wrapper {
    height: 100%;
    width: 100%;
    margin: spacing(sm);
  }
  ul {
    margin-left: spacing(md);
    @include respond-to('large') {
      margin: none;
      columns: 20ch 2;
      display: block;
    }
    list-style: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
    padding-block-start: 0;
    padding-block-end: 0;
    -webkit-padding-start: 0;
    li {
      font-size: .85em;
      display: block;
      color: color(dark);
      padding-bottom: spacing(xs);
    }
  }
}

</style>
