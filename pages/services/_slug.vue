<template>
  <article class="service">
    <h1>{{ t('title') }}</h1>
    <p>{{ t('description') }}</p>
    <img :src="attrs.image" alt="Image of service">
  </article>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug;
      // get current page data
      const page = await import(`~/content/services/${slug}.md`);
      return {
        page,
        slug
      }
    } catch(err) {
      console.debug(err)
      return false
    }
  },
  computed: {
    attrs() {
      const results = { de: {}, en: {} };
      const page = this.$data.page;
      const locale = this.$i18n.locale;
      Object.keys(page.attributes).forEach(attribute => {
        results[attribute] = page.attributes[attribute];
        if (attribute.match(/de_/)) {
          results['de'][attribute.substr(3)] = page.attributes[attribute];
        }
        if (attribute.match(/en_/)) {
          results['en'][attribute.substr(3)] = page.attributes[attribute];
        }
      });
      return results;
    }
  },
  methods: {
    t(attr) {
      return this.attrs[this.$i18n.locale][attr];
    }
  }
}
</script>
