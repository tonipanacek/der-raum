<template>
  <Container class="text-image-grid article" :id="formatSlug($ta(page.attributes, 'title'))">
    <div class="section-item image-container">
      <Frame :n="16" :d="9">
        <img :src="$ta(page.attributes, 'image')"/>
      </Frame>
    </div>
    <div class="section-item text">
      <h1>{{ $ta(page.attributes, "title_of_section") }}</h1>
      <vue-markdown>{{ $ta(page.attributes, "text_section") }}</vue-markdown>
    </div>
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
    }
  },
  methods: {
    getTitle(attrs) {
      return get(attrs, 'title', '')
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
.text {
  padding: spacing(frame);
  @include respond-to('large') {
    padding: 0;
    grid-column: span 2;
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
  p, a, ul > li {
    // line-height: 2rem;
    color: color(dark);
    font-size: .85rem;
  }
  strong {
    color: color(dark);
    font-weight: 600;
  }
}

#philosophy, #philosophie {
  .frame > img {
    object-position: top;
    // object-fit: contain;
  }
}
#partners, #partner {
  a { display: inline; }
  .frame > img {
    object-position: bottom;
  }
}
</style>
