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
      >
        <Frame v-if="room.attributes.orientation === 'portrait'" :n="4" :d="3">
          <img :src="$ta(room.attributes, 'image')" :alt="$ta(room.attributes, 'title')" />
        </Frame>
        <Frame v-else>
          <img :src="$ta(room.attributes, 'image')" :alt="$ta(room.attributes, 'title')" />
        </Frame>
        <h3 class="room-title">
          {{ $ta(room.attributes, 'title') }}
        </h3>
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
    goingUp: Boolean
  },
  methods: {
    path(page) {
      const slug = this.formatSlug(get(page, "attributes.title", ""))
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
    position: sticky;
    height: $main-height;
    display: grid;
    overflow: hidden;
    grid-template-columns: .3fr 3fr .3fr .5fr 2fr;
    grid-template-rows: 2fr .2fr 1.2fr .6fr 1.5fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .room-link:nth-child(1) {
    grid-area: 1 / 2 / 3 / 4;
    align-self: stretch;
  }
  .room-link:nth-child(2) {
    grid-area: 1 / 5 / 4 / 6;
    .frame {
      height: 100%;
    }
  }
  .room-link:nth-child(3) {
    grid-area: 4 / 1 / 7 / 3;
    align-self: end;
  }
  .room-link:nth-child(4) {
    grid-area: 5 / 5 / 7 / 6;
    .frame {
      height: 100%;
    }
  }
}

.room-title {
  @include smallCaps;
  color: color(light);
  font-weight: 500;
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
    color: color(dark);
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
  .rooms-link {
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
