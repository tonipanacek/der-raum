<template>
  <Container class="contact-grid" :id="formatSlug($ta(page.attributes, 'title'))">
    <div class="section-item image-container">
      <Frame :n="16" :d="9">
        <img :src="$ta(page.attributes, 'image')"/>
      </Frame>
    </div>
    <div class="section-item text">
      <h1>{{ $ta(page.attributes, "first_column") }}</h1>
      <a :href="'mailto:' + $ta(page.attributes, 'email')">{{ $ta(page.attributes, "email") }}</a>
      <p>{{ $ta(page.attributes, "telephone_1") }}</p>
      <p>{{ $ta(page.attributes, "telephone_2") }}</p>
      <h2 class="mt-2">{{ $ta(page.attributes, "second_column") }}</h2>
      <p>{{ $ta(page.attributes, "street_number") }} {{ $ta(page.attributes, "city_zip") }}</p>
      <p>{{ $ta(page.attributes, "weekdays") }} {{ $ta(page.attributes, "weekday_hours") }}</p>
      <p>{{ $ta(page.attributes, "weekend") }} {{ $ta(page.attributes, "weekend_hours") }}</p>
      <h3 class="mt-2">{{ $ta(page.attributes, "third_column") }}</h3>
      <p>{{ $ta(page.attributes, "cv_description") }}</p>
      <a :href="'mailto:' + $ta(page.attributes, 'cv_email')">{{ $ta(page.attributes, "cv_email") }}</a>
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
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: fit-content(260px);
    grid-auto-flow: row dense;
  }
  @include respond-to('xl') {
    grid-template-columns: 1fr 200px 1fr;
  }
  .image-container {
    @include respond-to('large') {
      position: sticky;
      top: 2rem;
      height: calc(100vh - 4rem);
      overflow: hidden;
    }
  }
}
  .text {
    padding: spacing(frame);
    @include respond-to('large') {
      padding: 0;
    }
    @include respond-to('xl') {
      grid-column: span 2;
    }
    h1 {
      @include smallCaps;
      color: color(black);
      font-weight: 600;
      @include respond-to('large') {
        margin-top: 0;
      }
    }
    .mt-2 {
      margin-top: 2rem;
    }
    ul {
      list-style-type: square;
    }
    .link-list {
      list-style: none;
      padding: 0;
      li {
        line-height: 1.5rem;
      }
    }
    p, ul > li {
      line-height: 2rem;
      color: color(dark);
      font-size: .85rem;
    }
    strong {
      color: color(dark);
      font-weight: 600;
    }
  }

  #philosophy, #philosophie {
    .frame > img {
      object-position: top;
    }
  }
</style>
