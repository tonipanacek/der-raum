<template>
  <Container id="contact">
    <Article class="contact">
      <div class="image-container">
        <Frame :source="page.attributes.image">
        </Frame>
      </div>
        <div class="text">
          <div class="info">
            <h1>{{ $ta(page.attributes, "first_column") }}</h1>
            <a :href="'mailto:' + page.attributes.email" class=" contact-link email">
              {{ page.attributes.email }}
            </a>
            <div class="justified">
              <a :href="'tel:' + page.attributes.telephone_2.replace(/\s|\(WhatsApp\)|\+/g, '')" class="contact-link tel" id="tel1">
                {{ page.attributes.telephone_2 }}
              </a><span class="white-space"></span>
              <a :href="'tel:' + page.attributes.telephone_1.replace(/\s/g, '')" class="contact-link tel" id="tel2">
                {{ page.attributes.telephone_1 }}
              </a>
            </div>
          </div>
          <div class="info">
            <h2>{{ $ta(page.attributes, "second_column") }}</h2>
            <a href="https://www.google.com/maps/search/?api=1&query=der%20raum" target="_blank" class="contact-link address">
              {{ page.attributes.street_number }}<span class="white-space"></span> {{ page.attributes.city_zip }}
            </a>
            <div class="justified hours">
              <p class="no-margin">{{ $ta(page.attributes, "weekdays") }}<span class="mobile1"></span> {{ page.attributes.weekday_hours }}</p><span class="white-space"></span>
              <p class="no-margin">{{ $ta(page.attributes, "weekend") }}<span class="mobile2"></span> {{ page.attributes.weekend_hours }}</p>
            </div>
          </div>
          <div class="info">
            <h3>{{ $ta(page.attributes, "third_column") }}</h3>
            <p class="no-margin">{{ $ta(page.attributes, "cv_description") }}</p>
            <p class="inlined no-margin"><a :href="'mailto:' + page.attributes.cv_email" class=" contact-link email"> {{ page.attributes.cv_email }}
            </a></p>
          </div>
        </div>
    </Article>
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
      // contact: json
    }
  }
}
</script>

<style lang="scss">
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
</style>
