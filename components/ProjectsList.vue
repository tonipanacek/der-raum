<template>
  <div class="projects-list">
    <transition-group
    name="insert"
    mode="out-in"
    tag="div"
    :class="{ 'projects-grid': true, 'going-up': goingUp, 'going-down': !goingUp }"
    >
      <NuxtLink
      :id="$ta(project.attributes, 'title')"
      v-for="project in projects"
      :key="getTitle(project.attributes)"
      :to="`/projects/${formatSlug(project.attributes.title)}`"
      class="project-link"
      >
        <Frame v-if="project.attributes.orientation === 'portrait'" :n="4" :d="3">
          <img :src="$ta(project.attributes, 'images[0]')" :alt="$ta(project.attributes, 'title')" />
        </Frame>
        <Frame v-else>
          <img :src="$ta(project.attributes, 'images[0]')" :alt="$ta(project.attributes, 'title')" />
        </Frame>
        <h3 class="project-title">
          {{ $ta(project.attributes, 'title') }}
        </h3>
      </NuxtLink>
    </transition-group>
  </div>
</template>

<script>
import { get } from 'lodash';
import Frame from '~/components/Frame'
export default {
  name: "ProjectsList",
  components: {
    Frame
  },
  props: {
    projects: {
      type: Array,
      required: true
    },
    goingUp: Boolean
  },
  methods: {
    getTitle(attrs) {
      return get(attrs, 'title', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.projects-list, .projects-list > *, .projects-list > * > * {
  height: 100%;
}

.projects-grid {
  @include respond-to(large) {
    display: grid;
    grid-gap: spacing(sm);
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr 1fr;
    & > * {
      width: 100%;
      height: 100%;
      justify-self: center;
    }
    & > :nth-child(4) {
      transform: translateY(25%);
    }
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
  transition: transform 500ms ease;
  &:hover > .project-title {
    color: color(dark);
  }
  img {
    max-width: 100%;
    max-height: calc(100% - #{spacing(sm) * 2});
  }
  h3 {
    transition: opacity 750ms ease, color 500ms ease;
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
  .going-up & {
    margin-top: 50%;
  }
  .going-down & {
    margin-top: -50%;
  }
}
.insert-leave-to {
  opacity: 0;
  .going-up & {
    margin-top: -50%;
  }
  .going-down & {
    margin-top: 50%;
  }
}
.insert-enter-active {
  transition: opacity 1000ms ease 750ms, margin 1000ms ease 750ms;
}
.insert-leave-active {
  position: absolute;
  transition: opacity 750ms ease, margin 750ms ease;
}
.insert-move {
  transition: transform 750ms ease;
  z-index: 100;
}
</style>
