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
      :to="imagePath(project)"
      :class="{
        'active': hoveredMenuItem && hoveredMenuItem === $ta(project.attributes, 'title') || (hoveredMenuItem === 'more' && index === 3),
        hover: hoveredMenuItem,
        'project-link': true,
        'extra-space': projects[0] === '',
        'extra-margin': projects.length === 3 && index === projects.length - 1
      }"
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
          <div class="title-flex">
            <p class="project-title">
              {{ $ta(project.attributes, 'title') }}
            </p>
            <p class="project-architect" v-if="project.attributes.architect_name"> {{ $ta(project.attributes, 'architect_name') }}</p>
          </div>
        </div>
        <div v-else class="image-container">
          <img :src="$ta(project.attributes, 'main_image')" :alt="$ta(project.attributes, 'title')" />
          <div class="title-flex">
            <p class="project-title">
              {{ $ta(project.attributes, 'title') }}
            </p>
            <p class="project-architect" v-if="project.attributes.architect_name"> {{ $ta(project.attributes, 'architect_name') }}</p>
          </div>
        </div>
      </NuxtLink>
    </transition-group>
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
    imagePath(page) {
      const slug = this.formatSlug(this.$ta(page.attributes, 'title'))
      return this.localePath({
        name: "projects-slug-images-id",
        params: {
          slug,
          id: 1
        }
      })
    },
    beforeEnter: function(el) {
      el.classList.add('transition-hide')
      if (this.goingUp) {
        if (el.dataset.orientation === "portrait") {
          el.style.transform = "translateY(120%)"
        } else {
          el.style.transform = "translateY(180%)"
        }
      } else {
        if (el.dataset.orientation === "portrait") {
          el.style.transform = "translateY(-120%)"
        } else {
          el.style.transform = "translateY(-180%)"
        }
      }
      el.style.transition = "opacity 300 ease, transform 400 ease"
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
        const path = this.imagePath(project)
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

.title-flex {
  display: flex;
  justify-content: space-between;
  // flex-direction: column;
  @include respond-to('large') {
    // align-items: center;
    flex-wrap: wrap;
  }
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
  flex: 1;
  @include respond-to('large') {
    padding: 0;
    padding-top: 0.5em;
    margin: 0;
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
  @include respond-to('large') {
    padding: 0;
    padding-top: 0.5em;
    margin: 0;
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
