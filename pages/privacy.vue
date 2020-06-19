<template>
  <div id="privacy">
    <h1 class="title color:dark">{{ $ta(privacyJson, 'intro.title') }}</h1>
    <p v-for="text in $ta(privacyJson, 'intro.text')">{{ text }}</p>
    <h2 class="title">{{ $ta(privacyJson, 'officer.title') }}</h2>
    <p v-for="text in $ta(privacyJson, 'officer.text')">{{ text }}</p>
    <p class="list" v-for="text in $ta(privacyJson, 'official.list')">{{ text }}</p>
    <p class="title">{{ $ta(privacyJson, 'google-analytics.title') }}</p>
    <p v-for="text in $ta(privacyJson, 'google-analytics.text')">{{ text }}</p>
    <p class="title">{{ $ta(privacyJson, 'facebook.title') }}</p>
    <p v-for="text in $ta(privacyJson, 'facebook.text')">{{ text }}</p>
    <h2 class="title">{{ $ta(privacyJson, 'serverlogs.title') }}</h2>
    <p v-for="text in $ta(privacyJson, 'serverlogs.text')">{{ text }}</p>
    <p class="list" v-for="text in $ta(privacyJson, 'serverlogs.list')">{{ text }}</p>
    <p v-for="text in $ta(privacyJson, 'serverlogs.text2')">{{ text }}</p>
    <h2 class="title">{{ $ta(privacyJson, 'cookies.title') }}</h2>
    <p v-for="text in $ta(privacyJson, 'cookies.text')">{{ text }}</p>
    <h2 class="title">{{ $ta(privacyJson, 'contactform.title') }}</h2>
    <p v-for="text in $ta(privacyJson, 'contactform.text')">{{ text }}</p>
    <h2 class="title">{{ $ta(privacyJson, 'provideinfo.title') }}</h2>
    <p v-for="text in $ta(privacyJson, 'provideinfo.text')">{{ text }}</p>
    <h2 class="title">{{ $ta(privacyJson, 'security.title') }}</h2>
    <p v-for="text in $ta(privacyJson, 'security.text')">{{ text }}</p>
    <h2 class="title">{{ $ta(privacyJson, 'ssl.title') }}</h2>
    <p v-for="text in $ta(privacyJson, 'ssl.text')">{{ text }}</p>
  </div>
</template>

<script>
import json from "~/content/data/privacy"
import seo from "~/content/data/seo.json"
export default {
  head() {
    return {
      title: `${seo.shortTitle} | ${this.$t('rightSidebar.privacy')}`
    }
  },
  nuxtI18n: {
    paths: {
      en: '/privacy',
      de: '/datenschutz'
    }
  },
  data() {
    return {
      privacyJson: json
    }
  }
}
</script>

<style lang="scss">
  #privacy {
    padding: 0 2em;
    max-width: 1250px;
    margin: 0 auto;
    margin-bottom: 2em;
    h1 {
      margin-top: 0;
      font-size: 1rem;
    }
    a,
    a:focus,
    a:visited {
      transition: color 500ms ease;
      text-decoration: none;
      color: color(light);
      font-size: .8rem;
      &:hover {
        color: color(dark);
      }
    }
    @include respond-to('large') {
      padding: 0;
    }
    .list { margin: 0; }
  }
</style>
