<template>
  <Container id="contact">
    <Article class="contact">
      <div class="image-container">
        <Frame :image="$t('contact.cloudinaryImageUrl')">
          <!-- <img :src="$t('contact.cloudinaryImageUrl')"> -->
        </Frame>
      </div>
        <div class="text">
          <div class="info">
            <h1>{{ $t("contact.thirdColumn") }}</h1>
            <a href="mailto:derraum@holz-raum.de" class="contact-link">
              <p>{{ $t("contact.email") }}</p>
            </a>
            <a href="tel:017673564742" class="contact-link tel">
              {{ $t("contact.tel2") }}
            </a>
            <a href="tel:03039375300" class="contact-link tel">
              {{ $t("contact.tel") }}
            </a>
          </div>
          <div class="info">
            <h1>{{ $t("contact.firstColumn") }}</h1>
            <a href="https://www.google.com/maps/search/?api=1&query=der%20raum" target="_blank" class="contact-link address">
              <p>{{ $t("contact.streetNumber") }} {{ $t("contact.cityZip") }}</p>
            </a>
            <p class="hours">{{ $t("contact.weekdays") }}<span>{{ $t("contact.weekdayHours") }}</span> {{ $t("contact.weekend") }}<span>{{ $t("contact.weekendHours") }}</span></p>
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
      min-width: 33%;
      width: 32ch;
      p {
        color: color(dark);
        font-weight: 300;
        margin: 0;
      }

      .contact-link {
        text-decoration: none;
        color: color(dark);
        transition: font-weight 100ms ease;
        line-height: 2em;
        margin-bottom: .5em;
        &:hover {
          p{
            color: color(dark);
            font-weight: 600;
          }
        }
      }
      .hours {
        display: flex;
        justify-content: space-between;
        width: 25ch;
      }
      .tel {
        font-size: .85em;
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
