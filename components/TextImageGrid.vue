<template>
  <Container class="text-image-grid" :id="formatSlug($ta(page.attributes, 'title'))">
    <template v-for="(section, index) in sections">
      <div v-if="section.image" class="section-item image-container">
        <Frame n="16" d="9">
          <img :src="$ta(section, 'image')"/>
        </Frame>
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
import Article from '~/components/Article'
import Frame from '~/components/Frame'
import Container from '~/components/Container'

export default {
  name: "TextImageGrid",
  components: {
    Article,
    Frame,
    Container
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
$main-height: calc(100vh - #{spacing(frame)});
.text-image-grid {
  @include respond-to('large') {
    display: grid;
    column-gap: 2rem;
    grid-template-columns: 1fr 200px 1fr;
    grid-auto-rows: fit-content(260px);
    grid-auto-flow: row dense;
  }
  .image-container {
    @include respond-to('large') {
      position: sticky;
      top: 2rem;
      height: calc(100vh - 4rem);
      overflow: hidden;
    }
  }
}
  // .text-image-grid {
  //   @include respond-to('large') {
  //     .image-container {
  //       float: left;
  //       width: 55ch;
  //       // margin-right: 2rem;
  //       margin-bottom: 2rem;
  //     }
  //     .text {
  //       padding-left: 3.5rem;
  //     }
  //     .frame > img {
  //       object-fit: contain;
  //     }
  //   }
  // }
  .text {
    padding: spacing(frame);
    @include respond-to('large') {
      padding: 0;
    }
    h1 {
      @include smallCaps;
      color: color(black);
      font-weight: 600;
      @include respond-to('large') {
        margin-top: 0;
      }
    }
    ul {
      list-style-type: square;
    }
    .link-list {
      list-style: none;
      padding: 0;
      li {
        line-height: 1.5rem;
      }
    }
    p, ul > li {
      line-height: 2rem;
      color: color(dark);
      font-size: .85rem;
    }
    strong {
      color: color(dark);
      font-weight: 600;
    }
  }
</style>
