<template>
  <Container id="contact">
    <Article class="contact">
      <div class="image-container">
        <Frame>
          <img :src="$t('contact.cloudinaryImageUrl')">
        </Frame>
      </div>
        <div class="text">
          <div class="info">
            <h1>{{ $t("contact.firstColumn") }}</h1>
            <a href="https://www.google.com/maps/search/?api=1&query=der%20raum" target="_blank" class="contact-item">
              <p>{{ $t("contact.streetNumber") }}</p>
              <p>{{ $t("contact.cityZip") }}</p>
            </a>
          </div>
          <div class="info">
            <h1>{{ $t("contact.secondColumn") }}</h1>
            <p class="hours">{{ $t("contact.weekdays") }}<span>{{ $t("contact.weekdayHours") }}</span></p>
            <p class="hours">{{ $t("contact.weekend") }}<span>{{ $t("contact.weekendHours") }}</span></p>
          </div>
          <div class="info">
            <h1>{{ $t("contact.thirdColumn") }}</h1>
            <a href="tel:03039375300" class="contact-item">
              <p>{{ $t("contact.tel") }}</p>
            </a>
            <a href="mailto:derraum@holz-raum.de" class="contact-item">
              <p>{{ $t("contact.email") }}</p>
            </a>
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
      title: `${seo.shortTitle} | ${this.$t('navbar.contact')}`
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
  }
}
</script>

<style lang="scss">
.contact {
  max-width: 1250px;
}
.contact {
  .text {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 1em;
    p {
      color: color(dark);
    }
  }
  .image-container {
    .frame {
      height: 100%;
      width: 100%;
    }
  }
}
.info {
  flex: 2 1 0%;
  width: 30px;
  padding-bottom: 1em;
  .contact-item {
    text-decoration: none;
    &:hover {
      p{
        color: color(black);
      }
    }
  }
  p {
    margin: 0;
  }
  #hidden-title {
    display: none;
    @include respond-to('large') {
      display: block;
      visibility: hidden;
    }
  }
  .hours {
    display: flex;
    justify-content: space-between;
    width: 25ch;
  }
}
</style>
