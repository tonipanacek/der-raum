<template>
  <div class="projects-list">
    <Cluster>
      <transition-group
      name="insert"
      mode="out-in"
      tag="div"
      class="transition-container"
      >
        <NuxtLink
        :id="$ta(project.attributes, 'title')"
        v-for="project in projects"
        :key="getTitle(project.attributes)"
        :to="`/projects/${formatSlug(project.attributes.title)}`"
        class="project-link"
        >
          <img :src="$ta(project.attributes, 'images[0]')" :alt="$ta(project.attributes, 'title')" />
          <h3 class="project-title">
            {{ $ta(project.attributes, 'title') }}
          </h3>
        </NuxtLink>
      </transition-group>
    </Cluster>
  </div>
</template>

<script>
import { get } from 'lodash';
import Cluster from '~/components/Cluster'
// import Frame from '~/components/Frame'
export default {
  name: "ProjectsList",
  components: {
    Cluster
  },
  props: {
    projects: {
      type: Array,
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

<style lang="scss" scoped>
.projects-list {
  max-height: calc(100vh - 4 * #{spacing(lg)});
  .cluster, .transition-container {
    max-height: calc(100vh - 2 * #{spacing(lg)});
    overflow: visible;
  }
}
.project-title {
  @include smallCaps;
  color: color(light);
  font-weight: 500;
  transition: color 500ms;
}
.project-link {
  text-decoration: none;
  display: block;
  transition: margin 750ms ease;
  width: calc(50% - #{spacing(sm)});
  height: calc(50vh - 8 * #{spacing(lg)} / 4);
  box-sizing: content-box !important;
  &:hover > .project-title {
    color: color(dark);
  }
  img {
    max-width: 100%;
    max-height: calc(100% - #{spacing(sm) * 2});
  }
  h3 {
    transition: opacity 750ms ease;
  }
  &:nth-child(2), &:nth-child(4) {
    height: calc(50vh - 8 * #{spacing(lg)} / 4);
  }
  &:nth-child(4) {
    pointer-events: none;
    h3 {
      opacity: 0;
    }
  }
}
// Transition
.insert-enter {
  opacity: 0;
}
.insert-leave-to {
  opacity: 0;
  transition: translateY(25%);
}
.insert-enter-active {
  transition: opacity 750ms ease 500ms, transform 750ms ease 500ms;
}
.insert-leave-active {
  position: absolute;
  transition: opacity 500ms ease, transform 500ms ease;
}
.insert-move {
  transition: transform 500ms ease;
  z-index: 100;
}
</style>
