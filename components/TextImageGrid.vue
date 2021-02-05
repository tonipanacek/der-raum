<template>
  <Container class="text-image-grid" :id="formatSlug($ta(page.attributes, 'title'))">
      <template v-for="(section, index) in sections">
        <div v-if="section.image" class="section-item image-container">
          <div class="frame-wrapper">
            <Frame :n="findOrientation(index) === 'portrait' ? 9 : 12" :d="findOrientation(index) === 'portrait' ? 16 : 9">
              <img :src="$ta(section, 'image')"/>
            </Frame>
          </div>
        </div>
        <div v-else class="section-item text">
          <h1 v-if="section.de_title_of_section">{{ $ta(section, "title_of_section") }}</h1>
          <vue-markdown>{{ $ta(section, "text_section") }}</vue-markdown>
        </div>
      </template>
  </Container>
</template>

<script>
import { get } from 'lodash'
import Frame from '~/components/Frame'
import Container from '~/components/Container'
import Article from '~/components/Article'

export default {
  name: "TextImageGrid",
  components: {
    Frame,
    Container,
    Article
  },
  props: {
    page: {
      type: Object,
      required: true
    },
    sections: {
      type: Array,
      required: true
    }
  },
  methods: {
    getTitle(attrs) {
      return get(attrs, 'title', '')
    },
    findOrientation(index) {
      return index % 2 === 1 ? "portrait" : "landscape"
    }
  }
}
</script>

<style lang="scss">
  .text-image-grid {
    @include respond-to('large') {
    .image-container {
      float: left;
      width: 55ch;
    }
    .text {
      padding-left: 3rem;
    }
    .frame > img { object-fit: contain }
    }
  }
</style>
