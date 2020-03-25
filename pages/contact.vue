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
            <a href="https://www.google.com/maps/search/?api=1&query=der%20raum" target="_blank" class="contact-link">
              <p>{{ $t("contact.streetNumber") }}<br>
              {{ $t("contact.cityZip") }}</p>
            </a>
          </div>
          <div class="info">
            <h1>{{ $t("contact.secondColumn") }}</h1>
            <p class="hours">{{ $t("contact.weekdays") }}<span>{{ $t("contact.weekdayHours") }}</span></p>
            <p class="hours">{{ $t("contact.weekend") }}<span>{{ $t("contact.weekendHours") }}</span></p>
          </div>
          <div class="info">
            <h1>{{ $t("contact.thirdColumn") }}</h1>
            <a href="tel:03039375300" class="contact-link">
              <p>{{ $t("contact.tel") }}</p>
            </a>
            <template v-if="$t('contact.tel2')">
              <a href="tel:017673564742" class="contact-link">
                <p>{{ $t("contact.tel2") }}</p>
              </a>
            </template>
            <a href="mailto:derraum@holz-raum.de" class="contact-link">
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
  .text {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 1em;
    .info {
      flex: 1 0 auto;
      width: 30ch;
      padding: 1em;
      h1 {
        height: 30px;
      }
      p {
        color: color(dark);
        font-weight: 300;
        margin: 0;
      }
      .contact-link {
        text-decoration: none;
        p:hover {
          color: color(dark);
          font-weight: 400;
        }
      }
      .hours {
        display: flex;
        justify-content: space-between;
        width: 25ch;
      }
    }
  }
  .image-container {
    .frame {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
