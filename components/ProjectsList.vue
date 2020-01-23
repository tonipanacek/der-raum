<template>
  <div class="projects-list">
    <Cluster>
      <transition-group
      name="insert"
      mode="out-in"
      tag="div"
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
.project-title {
  @include smallCaps;
  color: color(light);
  font-weight: 500;
  transition: color 500ms;
}
.project-link {
  text-decoration: none;
  display: block;
  &:hover > .project-title {
    color: color(dark);
  }
}
img {
  max-height: calc(40vh - 3rem);
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
  transition: transform 750ms ease;
  z-index: 100;
}
</style>
