<template>
  <Container id="contact">
    <Article class="contact">
      <div class="image-container">
        <Frame>
          <img src="https://res.cloudinary.com/dwvtvuml8/image/upload/v1579776429/Kontakt-Beratung-Termin-Anfrage-Berlin_tkaqug.jpg">
        </Frame>
      </div>
      <!-- <Cluster> -->
        <div class="text">
          <div class="info">
            <h1>{{ $t("contact.firstTitle") }}</h1>
            <a href="https://www.google.com/maps/search/?api=1&query=der%20raum" target="_blank" class="contact-item">
              <p>{{ $t("contact.streetNumber") }}</p>
              <p>{{ $t("contact.cityZip") }}</p>
            </a>
          </div>
          <div class="info">
            <h1>{{ $t("contact.secondTitle") }}</h1>
            <p class="hours">{{ $t("contact.weekdays") }}<span>{{ $t("contact.weekdayHours") }}</span></p>
            <p class="hours">{{ $t("contact.weekend") }}<span>{{ $t("contact.weekendHours") }}</span></p>
          </div>
          <div class="info">
            <h1>{{ $t("contact.thirdTitle") }}</h1>
            <a href="tel:03039375300" class="contact-item">
              <p>{{ $t("contact.tel") }}</p>
            </a>
            <a href="mailto:derraum@holz-raum.de" class="contact-item">
              <p>{{ $t("contact.email") }}</p>
            </a>
          </div>
        </div>
      <!-- </Cluster> -->
    </Article>
  </Container>
</template>

<script>
import Container from '~/components/Container'
import Cluster from '~/components/Cluster'
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
    Cluster,
    Frame,
    Article
  }
}
</script>

<style lang="scss">
.contact {
  max-width: 110ch;
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
  flex: 0 1 31ch;
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
