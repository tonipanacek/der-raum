<template>
  <Container class="contact-grid" :id="formatSlug($ta(page.attributes, 'title'))">
    <div class="section-item image-container">
      <Frame :n="16" :d="9">
        <img :src="$ta(page.attributes, 'image')"/>
      </Frame>
    </div>
    <div class="section-item text">
      <vue-markdown>{{ $ta(page.attributes, 'main_text')}}</vue-markdown>
      <!-- <template v-for="(column, index) in page.attributes.column_header_and_text">
        <div class="text-group">
          <h2>{{ $ta(column, "group_header") }}</h2>
          <template v-for="subtext in column.group_subtext">
            <a v-if="subtext.is_email_link" :href="'mailto:' + $ta(subtext, 'text')">{{ $ta(subtext, "text") }}</a>
            <p v-else>{{ $ta(subtext, "text") }}</p>
          </template>
        </div>
      </template> -->
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container'
import Frame from '~/components/Frame'
import Article from "~/components/Article"
import seo from "~/content/data/seo.json"

export default {
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('navbar_titles.contact')}`
    }
  },
  nuxtI18n: {
    paths: {
      en: '/contact',
      de: '/kontakt'
    }
  },
  components: {
    Container,
    Frame,
    Article
  },
  async asyncData() {
    // create context via webpack to map over all blog pages
    const allPages = await require.context(
      "~/content/misc/",
      true,
      /\.md$/
    )
    let pages = allPages.keys().map(key => {
      // give back the value of each page context
      return allPages(key)
    })
    let page = pages[0]
    return {
      page
    }
  }
}
</script>

<style lang="scss">
$main-height: calc(100vh - #{spacing(frame)});
.contact-grid {
  @include respond-to('large') {
    display: grid;
    column-gap: 2rem;
    grid-template-columns: 1fr 200px 1fr;
    grid-auto-rows: fit-content(260px);
    grid-auto-flow: row dense;
  }
  .image-container {
    @include respond-to('large') {
      position: sticky;
      top: 2rem;
      height: calc(100vh - 4rem);
      overflow: hidden;
    }
  }
  .text {
    padding: spacing(frame);
    @include respond-to('large') {
      padding: 0;
      grid-column: span 2;
    }
    h1, h2, h3, h4, h5 {
      @include smallCaps;
      color: color(black);
      font-weight: 600;
      @include respond-to('large') {
        margin-bottom: .5rem;
        margin-top: 3rem;
      }
    }
    h1 { margin-top: 0; }
    p, a {
      color: color(dark);
      font-size: .85rem;
      margin: .5rem 0;
    }
    strong {
      color: color(dark);
      font-weight: 600;
    }
    .text-group {
      margin-bottom: 1.5rem;
    }
  }
}
</style>
