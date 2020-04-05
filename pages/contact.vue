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
            <a href="mailto:derraum@holz-raum.de" class="contact-link email">
              {{ $t("contact.email") }}
            </a>
            <div class="justified">
              <a href="tel:017673564742" class="contact-link tel">
                {{ $t("contact.tel2") }}
              </a><span class="white-space"></span>
              <a href="tel:03039375300" class="contact-link tel">
                {{ $t("contact.tel") }}
              </a>
            </div>
          </div>
          <div class="info">
            <h1>{{ $t("contact.firstColumn") }}</h1>
            <a href="https://www.google.com/maps/search/?api=1&query=der%20raum" target="_blank" class="contact-link address">
              {{ $t("contact.streetNumber") }}<span class="white-space"></span>{{ $t("contact.cityZip") }}
            </a>
            <div class="justified">
              <p class=" contact-link">{{ $t("contact.weekdays") }} {{ $t("contact.weekdayHours") }}</p><span class="white-space"></span>
              <p class=" contact-link">{{ $t("contact.weekend") }} {{ $t("contact.weekendHours") }}</p>
            </div>
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
    flex-flow: row wrap;
    width: 100%;
    align-items: flex-start;
    // padding: 0 1em;
    .info {
      margin-right: 10%;
      margin-bottom: 10%;
      @include respond-to('large') {
        margin-bottom: 3%;
      }
      p {
        margin-top: 0;
      }
      a {
        font-size: .8em;
      }
      .email, .address {
        display: block;
      }
      .justified {
        display: flex;
        width: 300px;
      }
      .white-space {
        padding-right: 20px;
      }
      .contact-link {
        text-decoration: none;
        color: color(dark);
        transition: font-weight 100ms ease;
        line-height: 2em;
        margin-bottom: .5em;
        &:hover {
          a{
            color: color(dark);
            font-weight: 600;
          }
        }
      }
      .hours {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
