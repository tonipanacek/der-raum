<template>
  <div class="rooms-list">
    <h1 class="accessible">{{ seo.roomsOverviewH1 }}</h1>
    <p class="accessible">{{ seo.roomsOverviewText }}</p>
    <transition-group
      name="insert"
      tag="div"
      class="rooms-grid"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <NuxtLink
      :id="$ta(room.attributes, 'title')"
      v-for="(room, index) in rooms"
      :key="getTitle(room.attributes)"
      :to="path(room)"
      :class="{ 'active': hoveredMenuItem && hoveredMenuItem === $ta(room.attributes, 'title'), hover: hoveredMenuItem, 'room-link': true, 'extra-margin': rooms.length === 3 && index === rooms.length - 1, 'extra-space': room.attributes === ''}"
      @mouseover.native="handleHover(room)"
      @mouseleave.native="handleBlur"
      :data-index="index"
      :data-total="rooms.length"
      :data-orientation="findOrientation(index)"
      event=""
      @click.native.prevent="handleClick(room, index)"
      >
        <div v-if="mobile" class="frame-wrapper">
          <Frame>
            <img :src="$ta(room.attributes, 'image')" :alt="$ta(room.attributes, 'title')" loading="lazy"/>
          </Frame>
          <p class="room-title">
            {{ $ta(room.attributes, 'title') }}
          </p>
        </div>
        <div v-else class="image-container">
          <img :src="$ta(room.attributes, 'image')" :alt="$ta(room.attributes, 'title')" />
          <p class="room-title">
            {{ $ta(room.attributes, 'title') }}
          </p>
        </div>
      </NuxtLink>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { get } from 'lodash';
import Frame from '~/components/Frame'
import seo from '../content/data/seo.json'
export default {
  name: "RoomsList",
  components: {
    Frame
  },
  data() {
    return {
      seo
    }
  },
  props: {
    rooms: {
      type: Array,
      required: true
    },
    goingUp: Boolean,
    mobile: Boolean
  },
  methods: {
    path(page) {
      const slug = this.formatSlug(this.$ta(page.attributes, "title"))
      return this.localePath({
        name: "rooms-slug",
        params: {
          slug
        }
      })
    },
    getTitle(attrs) {
      return get(attrs, 'title', '')
    },
    handleHover(room) {
      this.hover = room.attributes.title
      this.setHoveredMenuItem(this.$ta(room.attributes, 'title'))
    },
    handleBlur() {
      this.hover = ''
      this.unsetHoveredMenuItem()
    },
    handleClick(room, index) {
      if (index > 2 && !this.mobile) {
        this.$emit('increment')
      } else {
        const path = this.path(room)
        this.$router.push(path)
      }
    },
    findOrientation(index) {
      return index === 1 || index === 3 ? "portrait" : "landscape"
    },
    beforeEnter: function(el) {
      el.classList.add('transition-hide')
      if (this.goingUp) {
        if (el.dataset.orientation === "portrait") {
          el.style.transform = "translateY(120%)"
        } else {
          el.style.transform = "translateY(200%)"
        }
      } else {
        if (el.dataset.orientation === "portrait") {
          el.style.transform = "translateY(-120%)"
        } else {
          el.style.transform = "translateY(-200%)"
        }
      }
      el.style.transition = "opacity 300 ease, transform 300 ease"
    },
    enter: function(el, done) {
      setTimeout(() => {
       let delay = 30
        if (this.goingUp) {
          delay = 15
        }
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
  // opacity: 0;
}
.transition-show {
  opacity: 1;
}
// grid layout for big screens
@include respond-to('large') {
  .rooms-grid {
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
  .room-link:nth-child(1) {
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
  .room-link:nth-child(2) {
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
  .room-link:nth-child(3) {
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
  .room-link:nth-child(4) {
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
        object-fit: cover;
      }
    }
  }
}

.room-title {
  @include smallCaps;
  color: color(dark);
  font-weight: 300;
  transition: opacity 750ms ease, color 500ms ease;
  padding: 0.5em;
  margin-top: 0;
  @include respond-to('large') {
    padding: 0.5em 0;
    margin-top: 0;
  }
}

.room-link {
  text-decoration: none;
  transition: transform 650ms ease, opacity 0.3s ease-in-out;
  &:hover > .room-title {
    color: color(dark);
    font-weight: 900;
  }
  @media(hover: hover) and (pointer: fine) {
    &:hover > .room-title {
      color: color(dark);
      font-weight: 900;
    }
  }
}
// hovering effect
.hover {
  p {
    color: color(dark);
    font-weight: 900;
  }
  @media(hover: hover) and (pointer: fine) {
    p {
      color: color(dark);
      font-weight: 900;
    }
  }
}
.hover:not(.active) {
  opacity: .8;
  p {
    color: color(dark);
    font-weight: 300;
  }
}
</style>
