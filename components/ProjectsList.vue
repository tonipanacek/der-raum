<template>
  <div class="projects-list">
    <div id="projects-grid">
    <NuxtLink
    :id="$ta(project.attributes, 'title')"
    v-for="(project, index) in projects"
    :key="getTitle(project.attributes)"
    :to="path(project)"
    :class="{ 'active': hoveredMenuItem && hoveredMenuItem === $ta(project.attributes, 'title') || (hoveredMenuItem === 'more' && index === 3), hover: hoveredMenuItem, 'project-link': true, 'extra-space': projects[0] === '', 'extra-margin': projects.length === 3 && index === projects.length - 1 }"
    event=""
    @click.native.prevent="handleClick(project, index)"
    @mouseover.native="handleHover(project, index)"
    @mouseleave.native="handleBlur"
    :data-index="index"
    :data-total="projects.length"
    :data-orientation="findOrientation(index)"
    >
      <div v-if="mobile" class="frame-wrapper">
        <Frame>
          <img :src="$ta(project.attributes, 'main_image')" :alt="$ta(project.attributes, 'title')" loading="lazy"/>
        </Frame>
        <p class="project-title">
          {{ $ta(project.attributes, 'title') }}
        </p>
      </div>
      <div v-else class="image-container">
        <img :src="$ta(project.attributes, 'main_image')" :alt="$ta(project.attributes, 'title')" />
        <p class="project-title">
          {{ $ta(project.attributes, 'title') }}
        </p>
      </div>
    </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
    },
    goingUp: Boolean,
    mobile: Boolean
  },
  methods: {
    getTitle(attrs) {
      return get(attrs, 'title', '')
    },
    path(page) {
      const slug = this.formatSlug(this.$ta(page.attributes, 'title'))
      return this.localePath({
        name: "projects-slug",
        params: {
          slug
        }
      })
    },
    handleHover(project, index) {
      if (index === 3) {
        this.setHoveredMenuItem('more')
      } else {
        this.setHoveredMenuItem(this.$ta(project.attributes, 'title'))
      }
    },
    handleBlur() {
      this.unsetHoveredMenuItem()
    },
    handleClick(project, index) {
      if (index > 2 && !this.mobile) {
        this.$emit('increment')
      } else {
        const path = this.path(project)
        this.$router.push(path)
      }
    },
    findOrientation(index) {
      return index === 1 || index === 3 ? "portrait" : "landscape"
    },
    ...mapActions(['setHoveredMenuItem', 'unsetHoveredMenuItem'])
  },
  destroyed() {
    this.unsetHoveredMenuItem()
  },
  computed: {
    ...mapState(['hoveredMenuItem'])
  }
}
</script>

<style lang="scss" scoped>
$main-height: calc(100vh - #{spacing(frame)});
.project-title {
  @include smallCaps;
  color: color(dark);
  font-weight: 300;
  transition: color 500ms;
  padding: 0.5em;
  margin-top: 0;
  transition: opacity 750ms ease, color 500ms ease;
  @include respond-to('large') {
    padding: 0.5em 0;
    margin-top: 0;
  }
}

.project-link {
  text-decoration: none;
  transition: transform 650ms ease, opacity 0.3s ease-in-out;
  &:hover .project-title {
    color: color(dark);
    font-weight: 900;
  }
  @media(hover: hover) and (pointer: fine) {
    &:hover .project-title {
      color: color(dark);
      font-weight: 900;
    }
  }
}
</style>
