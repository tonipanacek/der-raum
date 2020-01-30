<template>
  <div class="rooms-list">
    <transition-group
    name="insert"
    mode="out-in"
    tag="div"
    :class="{ 'rooms-grid': true, 'going-up': goingUp, 'going-down': !goingUp }"
    >
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
    </transition-group>
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
  height: 100%;
  max-width: 80ch;
}

.rooms-grid {
  @include respond-to(large) {
    display: grid;
    grid-gap: spacing(md);
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: row dense;
    justify-content: space-between;
    max-width: 90ch;
    margin: 0 auto;
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

.room-title {
  @include smallCaps;
  color: color(light);
  font-weight: 500;
  transition: color 500ms;
}

.room-link {
  text-decoration: none;
  transition: transform 500ms ease, opacity 0.3s ease-in-out;
  &:hover > .room-title {
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
