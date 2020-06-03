<template>
  <Container id="contact">
    <Article class="contact">
      <div class="image-container">
        <Frame :source="$t('contact.cloudinaryImageUrl')">
        </Frame>
      </div>
        <div class="text">
          <div class="info">
            <h1>{{ $t("contact.firstColumn") }}</h1>
            <a href="mailto:derraum@holz-raum.de" class=" contact-link email">
              {{ $t("contact.email") }}
            </a>
            <div class="justified">
              <a href="tel:017673564742" class="contact-link tel" id="tel1">
                {{ $t("contact.telephone2") }}
              </a><span class="white-space"></span>
              <a href="tel:03039375300" class="contact-link tel" id="tel2">
                {{ $t("contact.telephone1") }}
              </a>
            </div>
          </div>
          <div class="info">
            <h2>{{ $t("contact.secondColumn") }}</h2>
            <a href="https://www.google.com/maps/search/?api=1&query=der%20raum" target="_blank" class="contact-link address">
              {{ $t("contact.streetNumber") }}<span class="white-space"></span>{{ $t("contact.cityZip") }}
            </a>
            <div class="justified hours">
              <p class="no-margin">{{ $t("contact.weekdays") }}<span class="mobile1"></span> {{ $t("contact.weekdayHours") }}</p><span class="white-space"></span>
              <p class="no-margin">{{ $t("contact.weekend") }}<span class="mobile2"></span> {{ $t("contact.weekendHours") }}</p>
            </div>
          </div>
          <div class="info">
            <h3>{{ $t("contact.thirdColumn") }}</h3>
            <p class="no-margin">{{ $t("contact.cvLine1") }}</p>
            <a href="mailto:kontakt@holz-raum.de" class=" contact-link email">{{ $t('contact.cvLine2')}} {{ $t('contact.cvEmail')}}</a>
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
    .info{
      margin-bottom: 10%;
      @include respond-to('large') {
        margin-bottom: 3%;
      }
      &:not(:last-child) {
        margin-right: 5%;
      }
      &:last-child {
        width: 220px;
      }
      a { font-size: .8em; }
      h1, h2, h3 { margin: .75rem 0; }
      .email, .address { display: block; }
      .justified {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
      }
      .white-space { padding-right: 15px; }
      .mobile1 { padding-right: 22.5px; }
      .mobile2 { padding-right: 58.5px; }
      #tel1 { width:180px; }
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
