<template>
  <article class="about">
    <img :src="attrs.image" :alt="attrs.title">
    <div class="about-text">
      <h1>
        {{ spacedTitle(t('title')) }}
      </h1>
      <p>
        {{ t('description') }}
      </p>
    </div>
  </article>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    // get the slug as a param to import the correct md file
    try {
      const slug = params.slug;
      // get current page data
      const page = await import(`~/content/about/${slug}.md`);
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
    },
    spacedTitle(title) {
      return title.split('').join(' ');
    }
  }
}
</script>

<style lang="scss">
  .about {
    max-width: 110ch;
    img, p {
      max-width: 110ch;
    }
    p {
      line-height: 2rem;
      color: color(light);
    }
    img {
      object-fit: cover;
      max-height: 70vh;
      width: 110ch;
    }
    h1 {
      @include smallCaps;
      color: color(dark);
    }
    &-text {
      display: inline-block;
    }
  }
</style>
