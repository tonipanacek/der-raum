<template>
  <Container class="contact-grid" :id="formatSlug($ta(page.attributes, 'title'))">
    <div class="section-item image-container">
      <Frame :n="16" :d="9">
        <img :src="$ta(page.attributes, 'image')"/>
      </Frame>
    </div>
    <div class="section-item text">
      <h1>{{ $ta(page.attributes, "first_column") }}</h1>
      <p>{{ $ta(page.attributes, "email") }}</p>
      <p>{{ $ta(page.attributes, "telephone_1") }}</p>
      <p>{{ $ta(page.attributes, "telephone_2") }}</p>
      <h2 class="mt-2">{{ $ta(page.attributes, "second_column") }}</h2>
      <p>{{ $ta(page.attributes, "street_number") }} {{ $ta(page.attributes, "city_zip") }}</p>
      <!-- <div class="flex flex-sb"> -->
        <p>{{ $ta(page.attributes, "weekdays") }} {{ $ta(page.attributes, "weekday_hours") }}</p>
        <p>{{ $ta(page.attributes, "weekend") }} {{ $ta(page.attributes, "weekend_hours") }}</p>
      <!-- </div> -->
      <h3 class="mt-2">{{ $ta(page.attributes, "third_column") }}</h3>
      <p>{{ $ta(page.attributes, "cv_description") }}</p>
      <p>{{ $ta(page.attributes, "cv_email") }}</p>
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

<!-- <style lang="scss">
.contact {
  max-width: 1250px;
  .text {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    align-items: flex-start;
    .info{
      margin-bottom: 7%;
      @include respond-to('large') {
        margin-bottom: 2%;
      }
      &:not(:last-child) {
        margin-right: 5%;
      }
      &:last-child {
        width: 220px;
      }
      a, p { font-size: .8rem; }
      h1, h2, h3 { margin: .75rem 0; }
      .email, .address { display: block; }
      .justified {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
      }
      .white-space { padding-right: 17px; }
      .mobile1 { padding-right: 22px; }
      .mobile2 { padding-right: 58.5px; }
      #tel1 { width:190px; }
      #tel2 { width:90px; }
      @include respond-to('large') {
        .white-space { padding-right: 27.5px; }
        .mobile1, .mobile2 { padding-right: 0px; }
      }
      .contact-link {
        text-decoration: none;
        color: color(dark);
        transition: font-weight 100ms ease;
        line-height: 2rem;
        margin-bottom: .5rem;
        &:hover {
          a{
            color: color(dark);
            font-weight: 600;
          }
        }
      }
      .no-margin {
        margin-top: 0;
        margin-bottom: .5rem;
      }
      .inlined > a {
        display: inline;
      }
      .hours {
        display: flex;
        justify-content: space-between;
        width: 300px;
        @include respond-to('large') {
          width: 100%;
        }
      }
    }
  }
}
</style> -->
