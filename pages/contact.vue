<template>
  <Container class="text-image-grid" id="contact">
    <div class="section-item image-container">
      <Frame :n="12" :d="9">
        <img :src="page.attributes.image" alt="Image of storefront"/>
      </Frame>
    </div>
    <div class="section-item text">
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

</style>
