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
      :class="{ 'active': hoveredMenuItem && hoveredMenuItem === $ta(project.attributes, 'title'), hover: hoveredMenuItem, 'project-link': true, 'extra-space': projects[0] === '', 'extra-margin': projects.length === 3 && index === projects.length - 1 }"
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
      el.classList.add('transition-hide')
      if (this.goingUp) {
        el.style.transform = "translateY(70vh)"
      } else {
        el.style.transform = "translateY(-70vh)"
      }
      // el.style.transition = "opacity 300 ease, transform 300 ease"
    },
    enter: function(el, done) {
      setTimeout(() => {
        setTimeout(() => {
          el.classList.remove('transition-hide')
          el.classList.add('transition-show')
          el.style.transform = "translateY(0)"
        }, 0)
        done()
      }, 0)
      el.classList.remove('transition-show')
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
.transition-hide {
  // opacity: .5;
}
.transition-show {
  opacity: 1;
}
// grid layout for big screens
@include respond-to('large') {
  #projects-grid {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    min-height: 570px;
    height: $main-height;
    max-width: 1250px;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 0px;
  }
  .project-link:nth-child(1) {
    width: 51%;
    height: 40%;
    margin-left: 5.5%;
    display: block;
    position: relative;
    align-self: auto;
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
        object-fit: cover;
      }
    }
    &.extra-space {
      @include respond-to('large') {
        visibility: hidden;
      }
    }
  }
  .project-link:nth-child(2) {
    width: 29%;
    height: 58.5%;
    margin-left: 0px;
    display: block;
    position: relative;
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
        object-fit: cover;
      }
    }
  }

  .project-link:nth-child(3) {
    width: 51%;
    height: 40%;
    margin-top: -48px;
    display: block;
    position: relative;
    &.extra-margin {
      margin-top: -104px;
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
        object-fit: cover;
      }
    }
  }
  .project-link:nth-child(4) {
    width: 29%;
    height: 58.5%;
    margin-left: 0px;
    margin-top: 75px;
    display: block;
    position: relative;
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
        object-fit: cover;
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
  transition: transform 750ms ease, opacity 0.3s ease-in-out;
  &:hover .project-title {
    color: color(dark);
    font-weight: 600;
  }
  h3 {
    transition: opacity 750ms ease, color 500ms ease;
  }
}
// hovering effect
.hover {
  h3 {
    color: color(black);
    font-weight: 600;
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
