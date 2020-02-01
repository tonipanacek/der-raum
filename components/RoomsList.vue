<template>
  <div class="rooms-list">
    <!-- <transition-group
    name="insert"
    mode="out-in"
    tag="div"
    :class="{ 'rooms-grid': true, 'going-up': goingUp, 'going-down': !goingUp }"
    > -->
    <div class="rooms-grid">
      <NuxtLink
      :id="$ta(room.attributes, 'title')"
      v-for="room in rooms"
      :key="getTitle(room.attributes)"
      :to="`/rooms/${formatSlug(room.attributes.title)}`"
      :class="{ 'active': hover && hover === room.attributes.title, hover: hover, 'room-link': true }"
      @mouseover.native="hover = room.attributes.title"
      @mouseleave.native="hover = ''"
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
    </div>
    <!-- </transition-group> -->
  </div>
</template>

<script>
import { get } from 'lodash';
import Frame from '~/components/Frame'
export default {
  name: "RoomsList",
  components: {
    Frame
  },
  data() {
    return {
      hover: ''
    }
  },
  props: {
    rooms: {
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
.rooms-list, .rooms-list > *, .rooms-list > * > * {
  // height: 100%;
  // max-width: 80ch;
}

$main-height: calc(100vh - 2 * #{spacing(lg)});
// grid layout for big screens
@include respond-to('large') {
  .rooms-grid {
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
  .room-link:nth-child(1) { grid-area: 1 / 2 / 3 / 4; }
  .room-link:nth-child(2) {
    grid-area: 1 / 5 / 3 / 6;
    .frame {
      height: 100%;
      img {
        align-self: start;
        justify-self: start;
      }
    }
  }
  .room-link:nth-child(3) { grid-area: 4 / 1 / 7 / 3; }
  .room-link:nth-child(4) {
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

.room-title {
  @include smallCaps;
  color: color(light);
  font-weight: 500;
  transition: opacity 750ms ease, color 500ms ease;
  margin-top: 0.5em;
}

.room-link {
  text-decoration: none;
  transition: transform 500ms ease, opacity 0.3s ease-in-out;
  &:hover > .room-title {
    color: color(dark);
  }
  img {
    max-width: 100%;
  }
  &:nth-child(4) {
    pointer-events: none;
    h3 {
      opacity: 0;
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
