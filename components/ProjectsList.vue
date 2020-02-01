<template>
  <div class="projects-list">
    <!-- <transition-group
    name="insert"
    mode="out-in"
    tag="div"
    :class="{ 'projects-grid': true, 'going-up': goingUp, 'going-down': !goingUp }"
    > -->
    <div class="projects-grid">
      <NuxtLink
      :id="$ta(project.attributes, 'title')"
      v-for="project in projects"
      :key="getTitle(project.attributes)"
      :to="`/projects/${formatSlug(project.attributes.title)}`"
      :class="{ 'active': hover && hover === project.attributes.title, hover: hover, 'project-link': true }"
      @mouseover.native="hover = project.attributes.title"
      @mouseleave.native="hover = ''"
      >
        <Frame v-if="project.attributes.orientation === 'portrait'" :n="4" :d="3">
          <img :src="$ta(project.attributes, 'main_image')" :alt="$ta(project.attributes, 'title')" />
        </Frame>
        <Frame v-else>
          <img :src="$ta(project.attributes, 'main_image')" :alt="$ta(project.attributes, 'title')" />
        </Frame>
        <h3 class="project-title">
          {{ $ta(project.attributes, 'title') }}
        </h3>
      </NuxtLink>
    </div>
    <!-- </transition-group> -->
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
  data() {
    return {
      hover: ''
    }
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
  // height: 100%;
  // max-width: 80ch;
}


$main-height: calc(100vh - 2 * #{spacing(lg)});
// grid layout for big screens
@include respond-to('large') {
  .projects-grid {
    position: sticky;
    max-width: 110ch;
    height: $main-height;
    display: grid;
    overflow: hidden;
    grid-template-columns: .1fr 3fr .1fr .5fr 2fr;
    grid-template-rows: 2fr repeat(2, .4fr) 1fr 1.5fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .project-link:nth-child(1) { grid-area: 1 / 2 / 3 / 4; }
  .project-link:nth-child(2) {
    grid-area: 1 / 5 / 3 / 6;
    .frame {
      height: 100%;
      img {
        align-self: start;
        justify-self: start;
      }
    }
  }
  .project-link:nth-child(3) { grid-area: 4 / 1 / 7 / 3; }
  .project-link:nth-child(4) {
    grid-area: 5 / 5 / 7 / 6;
    .frame {
      height: 100%;
      img {
        align-self: start;
        justify-self: start;
      }
    }
  }
}

.project-title {
  @include smallCaps;
  color: color(light);
  font-weight: 500;
  transition: color 500ms;
  margin-top: 0.5em;
  padding-left: 2em;
  @include respond-to('large') {
    padding: 0;
  }
}

.project-link {
  text-decoration: none;
  transition: transform 500ms ease, opacity 0.3s ease-in-out;
  &:hover > .project-title {
    color: color(dark);
  }
  h3 {
    transition: opacity 750ms ease, color 500ms ease;
  }
  &:nth-child(4) {
    pointer-events: none;
    h3 {
      @include respond-to('large') {
        opacity: 0;
      }
    }
  }
}
// hovering effect
.hover {
  h3 {
    color: color(dark);
  }
  .projects-link {
    color: color(dark);
    border: 1px solid color(dark);
  }
}
.hover:not(.active) {
  opacity: .3;
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
