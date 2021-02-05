<template>
  <div id="sections-grid">
    <div class="frame-wrapper">
      <Frame :n="findOrientation(index) === 'portrait' ? 11 : 9" :d="findOrientation(index) === 'portrait' ? 9 : 16">
        <img :src="$ta(project.attributes, 'main_image')" :alt="$ta(project.attributes, 'title')" loading="lazy"/>
      </Frame>
      <div class="title-flex">
          <p class="project-title">
            {{ $ta(project.attributes, 'title') }}
          </p>
          <p class="project-architect" v-if="project.attributes.architect_name"> {{ $ta(project.attributes, 'architect_name') }}</p>
        </div>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
import Frame from '~/components/Frame'
import dynamicSEO from '~/plugins/dynamic_seo'
export default {
  name: "TextImageGrid",
  components: {
    Frame
  },
  mixins: [dynamicSEO],
  props: {
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

<style lang="scss" scoped>
$main-height: calc(100vh - #{spacing(frame)});

#sections-grid {
  @include respond-to('large') {
    display: grid;
    column-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: fit-content(260px);
    grid-auto-flow: row dense;
    .project-link:first-child {
      grid-column: span 2;
      grid-row: span 2;
    }
    .portrait {
      grid-row: span 2;
    }
  }
}

</style>
