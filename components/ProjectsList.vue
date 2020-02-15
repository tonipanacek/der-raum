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
      event=""
      @click.native.prevent="handleClick(project, index)"
      @mouseover.native="handleHover(project)"
      @mouseleave.native="handleBlur"
      :data-index="index"
      :data-total="projects.length"
      >
        <div v-if="mobile" class="frame-wrapper">
          <Frame>
            <img :src="$ta(project.attributes, 'main_image')" :alt="$ta(project.attributes, 'title')" />
          </Frame>
          <h3 class="project-title">
            {{ $ta(project.attributes, 'title') }}
          </h3>
        </div>
        <div v-else class="image-container">
          <img :src="$ta(project.attributes, 'main_image')" :alt="$ta(project.attributes, 'title')" />
          <h3 class="project-title">
            {{ $ta(project.attributes, 'title') }}
          </h3>
        </div>
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
    beforeEnter: function(el) {
      el.style.opacity = 0
      if (this.goingUp) {
        el.style.transform = "translateY(10%)"
      } else {
        el.style.transform = "translateY(-10%)"
      }
      el.style.transition = "opacity 400 ease, transform 400 ease"
    },
    enter: function(el, done) {
      setTimeout(() => {
        let delay = (parseInt(el.dataset.total) - parseInt(el.dataset.index) - 1) * 200
        if (this.goingUp) {
          delay = parseInt(el.dataset.index) * 200
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
    handleClick(project, index) {
      if (index > 2 && !this.mobile) {
        this.$emit('increment')
      } else {
        const path = this.path(project)
        this.$router.push(path)
      }
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
// grid layout for big screens
@include respond-to('large') {
  #projects-grid {
    min-height: 500px;
    height: $main-height;
    max-width: 110ch;
    margin: 0 auto;
    display: grid;
    overflow: hidden;
    grid-template-columns: minmax(0, .3fr) minmax(0, 2.5fr) minmax(0, .3fr) minmax(0, .8fr) minmax(0, 1.6fr);
    grid-template-rows: minmax(0, 2.1fr) minmax(0, .4fr) minmax(0, .8fr) minmax(0, .4fr) minmax(0, 2.1fr) minmax(0, 0.5fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .project-link:nth-child(1) {
    grid-area: 1 / 2 / 3 / 4;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
    &:before {
      display: block;
      content: "";
      width: 100%;
      padding-top: (16 / 9) * 100%;
    }
    > .image-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .project-link:nth-child(2) {
    grid-area: 1 / 5 / 5 / 6;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
    align-self: end;
    &:before {
      display: block;
      content: "";
      width: 100%;
      padding-top: (9 / 16) * 100%;
    }
    > .image-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .project-link:nth-child(3) {
    grid-area: 4 / 1 / 6 / 3;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
    &:before {
      display: block;
      content: "";
      width: 100%;
      padding-top: (16 / 9) * 100%;
    }
    > .image-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .project-link:nth-child(4) {
    grid-area: 5 / 5 / 7 / 6;
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-top: 75px;
    &:before {
      display: block;
      content: "";
      width: 100%;
      padding-top: (9 / 16) * 100%;
    }
    > .image-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
      }
    }
  }
}

.project-title {
  @include smallCaps;
  color: color(dark);
  font-weight: 500;
  transition: color 500ms;
  margin-top: 0.5em;
  padding-left: 0.5em;
  padding-bottom: 0.5em;
  @include respond-to('large') {
    padding: 0;
  }
}

.project-link {
  text-decoration: none;
  transition: transform 500ms ease, opacity 0.3s ease-in-out;
  &:hover > .project-title {
    color: color(black);
    font-weight: 600;
  }
  h3 {
    transition: opacity 750ms ease, color 500ms ease;
  }
  &:nth-child(4) {
    @include respond-to('large') {
      h3 {
        opacity: 0;
      }
    }
  }
}
// hovering effect
.hover {
  h3 {
    color: color(black);
    font-weight: 600;
  }
  .projects-link {
    color: color(black);
    font-weight: 600;
    border: 1px solid color(black);
  }
}
.hover:not(.active) {
  opacity: .8;
  h3 {
    color: color(dark);
    font-weight: 400;
  }
}
</style>
