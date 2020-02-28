<template>
  <div class="rooms-list">
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
      :class="{ 'active': hoveredMenuItem && hoveredMenuItem === $ta(room.attributes, 'title'), hover: hoveredMenuItem, 'room-link': true }"
      @mouseover.native="handleHover(room)"
      @mouseleave.native="handleBlur"
      :data-index="index"
      :data-total="rooms.length"
      event=""
      @click.native.prevent="handleClick(room, index)"
      >
        <div v-if="mobile" class="frame-wrapper">
          <Frame>
            <img :src="$ta(room.attributes, 'image')" :alt="$ta(room.attributes, 'title')" />
          </Frame>
          <h3 class="room-title">
            {{ $ta(room.attributes, 'title') }}
          </h3>
        </div>
        <div v-else class="image-container">
          <img :src="$ta(room.attributes, 'image')" :alt="$ta(room.attributes, 'title')" />
          <h3 class="room-title">
            {{ $ta(room.attributes, 'title') }}
          </h3>
        </div>
      </NuxtLink>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { get } from 'lodash';
import Frame from '~/components/Frame'
export default {
  name: "RoomsList",
  components: {
    Frame
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
  .rooms-grid {
    min-height: 500px;
    height: $main-height;
    max-width: 120ch;
    margin: 0 auto;
    display: -ms-grid;
    display: grid;
    overflow: hidden;
    -ms-grid-columns: minmax(0, .3fr) minmax(0, 2.5fr) minmax(0, .3fr) minmax(0, .8fr) minmax(0, 1.6fr);
    grid-template-columns: minmax(0, .3fr) minmax(0, 2.5fr) minmax(0, .3fr) minmax(0, .8fr) minmax(0, 1.6fr);
    -ms-grid-rows: minmax(0, 2.1fr) minmax(0, .4fr) minmax(0, .8fr) minmax(0, .4fr) minmax(0, 2.1fr) minmax(0, 0.5fr);
    grid-template-rows: minmax(0, 2.1fr) minmax(0, .4fr) minmax(0, .8fr) minmax(0, .4fr) minmax(0, 2.1fr) minmax(0, 0.5fr);
  }
  .room-link:nth-child(1) {
    -ms-grid-column: 2;
    -ms-grid-column-span: 4;
    -ms-grid-row: 1;
    -ms-grid-row-span: 3;
    grid-area: 1 / 2 / 3 / 4;
    height: 100%;
    width: 100%;
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
  .room-link:nth-child(2) {
    -ms-grid-column: 5;
    -ms-grid-column-span: 6;
    -ms-grid-row: 1;
    -ms-grid-row-span: 5;
    grid-area: 1 / 5 / 5 / 6;
    height: 100%;
    width: 100%;
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
    -ms-grid-column: 1;
    -ms-grid-column-span: 3;
    -ms-grid-row: 4;
    -ms-grid-row-span: 6;
    grid-area: 4 / 1 / 6 / 3;
    height: 100%;
    width: 100%;
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
  .room-link:nth-child(4) {
    -ms-grid-column: 5;
    -ms-grid-column-span: 6;
    -ms-grid-row: 5;
    -ms-grid-row-span: 7;
    grid-area: 5 / 5 / 7 / 6;
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-top: 75px;
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
  font-weight: 400;
  transition: opacity 750ms ease, color 500ms ease;
  margin-top: 0.5em;
  padding-left: 0.5em;
  padding-bottom: 0.5em;
  @include respond-to('large') {
    padding: 0;
  }
}

.room-link {
  text-decoration: none;
  transition: transform 500ms ease, opacity 0.3s ease-in-out;
  &:hover > .room-title {
    color: color(black);
    font-weight: 600;
  }
}
// hovering effect
.hover {
  h3 {
    color: color(black);
    font-weight: 600;
  }
  .rooms-link {
    color: color(black);
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
