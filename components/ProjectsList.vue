<template>
  <div id="projects-grid">
    <NuxtLink
    :id="$ta(project.attributes, 'title')"
    v-for="(project, index) in projects"
    :key="getTitle(project.attributes)"
    :to="imagePath(project)"
    :class="{
      'project-link': true,
      'portrait': findOrientation(index) === 'portrait'
    }"
    event=""
    @click.native.prevent="handleClick(project)"
    :data-index="index"
    :data-orientation="findOrientation(index)"
    >
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
    </NuxtLink>
  </div>
</template>

<script>
import { get } from 'lodash'
import Frame from '~/components/Frame'
import dynamicSEO from '~/plugins/dynamic_seo'
export default {
  name: "ProjectsList",
  components: {
    Frame
  },
  mixins: [dynamicSEO],
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  methods: {
    getTitle(attrs) {
      return get(attrs, 'title', '')
    },
    imagePath(project) {
      const slug = this.formatSlug(this.$ta(project.attributes, 'title'))
      return this.localePath({
        name: 'projects-slug-images-id',
        params: {
          slug: slug,
          id: 1
        }
      })
    },
    handleClick(project) {
      const path = this.imagePath(project)
      this.$router.push(path)
    },
    findOrientation(index) {
      return index % 2 === 1 ? "portrait" : "landscape"
    },
  }
}
</script>

<style lang="scss" scoped>
$main-height: calc(100vh - #{spacing(frame)});

#projects-grid {
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

.title-flex {
  display: flex;
  justify-content: space-between;
}

.project-architect {
  @include smallCaps;
  color: color(dark);
  font-weight: 300;
  transition: color 500ms;
  padding: 0.5em;
  margin-top: 0;
  transition: opacity 750ms ease, color 500ms ease;
  text-align: right;
  flex: 1 0 33%;
  @include respond-to('large') {
    flex: 2;
  }
}

.project-title {
  @include smallCaps;
  color: color(dark);
  font-weight: 300;
  transition: color 500ms;
  padding: 0.5em;
  margin-top: 0;
  transition: opacity 750ms ease, color 500ms ease;
  flex: 2;
}

.project-link {
  text-decoration: none;
  transition: all 500ms;
  &:hover .project-title {
    color: color(dark);
    font-weight: 600;
  }
  @media(hover: hover) and (pointer: fine) {
    &:hover .project-title {
      color: color(dark);
    }
  }
}
</style>
