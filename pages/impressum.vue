<template>
  <div id="legal">
    <h1 class="title color:dark">{{ $t("legal.title") }}</h1>
    <div class="legal-contact">
      <ul class="contact-list">
        <li v-for="text in $ta(legalJson, 'contact.text')">{{ text }}</li>
      </ul>
      <ul class="tax-info-list">
        <li v-for="text in $ta(legalJson, 'tax.text')">{{ text }}</li>
      </ul>
    </div>
    <h2 class="title">{{ $ta(legalJson, 'links.title') }}</h2>
    <p v-for="text in $ta(legalJson, 'links.text')">{{ text }}</p>
    <h2 class="title">{{ $ta(legalJson, 'disclaimer.title') }}</h2>
    <p v-for="text in $ta(legalJson, 'photos.text')">{{ text }}</p>
    <h2 class="title">{{ $ta(legalJson, 'photos.title') }}</h2>
    <p v-for="text in $ta(legalJson, 'photos.text')">{{ text }}</p>
    <h2 class="title">{{ $ta(legalJson, 'website.title') }}</h2>
    <a :href="$ta(legalJson, 'website.link')" target="_blank">{{ $ta(legalJson, 'website.text')}}</a>
  </div>
</template>
<script>
import json from "~/content/data/legal"
import Cluster from "~/components/Cluster"
import seo from "~/content/data/seo.json"
export default {
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('rightSidebar.impressum')}`
    }
  },
  nuxtI18n: {
    paths: {
      en: '/impressum',
      de: '/impressum'
    }
  },
  name: "Legal",
  data() {
    return {
      legalJson: json
    }
  }
}
</script>
<style lang="scss">
  #legal {
    padding: 0 2em;
    max-width: 1250px;
    margin: 0 auto;
    margin-bottom: 2em;
    h1 {
      margin-top: 0;
      font-size: 1rem;
    }
    .legal-contact {
      .contact-list, .tax-info-list {
        padding-left: 0px;
        list-style: none;
        display: flex;
        flex-direction: column;
      }
      @include respond-to('large') {
        display: flex;
        flex-wrap: column;
        justify-content: space-between;
        width: 80ch;
      }
    }
    a,
    a:focus,
    a:visited {
      transition: color 500ms ease;
      text-decoration: none;
      color: color(light);
      font-size: .85em;
      &:hover {
        color: color(dark);
      }
    }
    @include respond-to('large') {
      padding: 0;
    }
  }
</style>
