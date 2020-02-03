<template>
  <div class="projects-list">
    <transition-group
      name="insert"
      tag="div"
      id="projects-grid"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <NuxtLink
      :id="$ta(project.attributes, 'title')"
      v-for="(project, index) in projects"
      :key="getTitle(project.attributes)"
      :to="path(project)"
      :class="{ 'active': hoveredMenuItem && hoveredMenuItem === $ta(project.attributes, 'title'), hover: hoveredMenuItem, 'project-link': true }"
      @mouseover.native="handleHover(project)"
      @mouseleave.native="handleBlur"
      :data-index="index"
      :data-total="projects.length"
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
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { get } from 'lodash'
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
    },
    path(page) {
      const slug = this.formatSlug(get(page, "attributes.title", ""))
      return this.localePath({
        name: "projects-slug",
        params: {
          slug
        }
      })
    },
    beforeEnter: function(el) {
      el.style.opacity = 0
      if (this.goingUp) {
        el.style.transform = "translateY(25%)"
      } else {
        el.style.transform = "translateY(-25%)"
      }
      el.style.transition = "opacity 250ms ease, transform 250ms ease"
    },
    enter: function(el, done) {
      setTimeout(() => {
        let delay = parseInt(el.dataset.index) * 250
        if (this.goingUp) {
          delay = (parseInt(el.dataset.total) - parseInt(el.dataset.index) - 1) * 250
        }
        setTimeout(() => {
          el.style.opacity = 1
          el.style.transform = "translateY(0)"
        }, delay)
        done()
      }, 500)
    },
    leave: function(el, done) {
      done()
    },
    handleHover(project) {
      this.setHoveredMenuItem(this.$ta(project.attributes, 'title'))
    },
    handleBlur() {
      this.unsetHoveredMenuItem()
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
.projects-list, .projects-list > *, .projects-list > * > * {
  // height: 100%;
  // max-width: 80ch;
}


$main-height: calc(100vh - #{spacing(frame)});
// grid layout for big screens
@include respond-to('large') {
  #projects-grid {
    max-width: 110ch;
    height: $main-height;
    display: grid;
    overflow: hidden;
    grid-template-columns: .3fr 3fr .3fr .5fr 2fr;
    grid-template-rows: 2fr repeat(2, .4fr) 1fr 1.5fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .project-link:nth-child(1) {
    grid-area: 1 / 2 / 3 / 4;
    align-self: stretch;
  }
  .project-link:nth-child(2) {
    grid-area: 1 / 5 / 4 / 6;
    .frame {
      height: 100%;
      img {
        align-self: start;
        justify-self: start;
      }
    }
  }
  .project-link:nth-child(3) {
    grid-area: 4 / 1 / 7 / 3;
    align-self: end;
  }
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
  opacity: .8;
  h3 {
    color: color(light);
  }
}
</style>
