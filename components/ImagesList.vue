<template>
  <div class="images-list">
      <!-- <transition-group
      name="insert"
      mode="out-in"
      tag="div"
      :class="{ 'images-grid': true, 'going-up': goingUp, 'going-down': !goingUp }"
      > -->
      <div class="images-grid">
        <NuxtLink
        :id="title"
        v-for="image in images"
        :key="image.url"
        :to="`/projects/${slug}/images/${image.index}`"
        class="image-link"
        >
          <Frame v-if="image.index % 2" :n="9" :d="16">
            <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" />
          </Frame>
          <Frame v-else :n="4" :d="3">
            <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" />
          </Frame>
          <h3 class="image-title">
            {{ title }} {{ image.index + (page * 4) }} / {{ totalCount }}
          </h3>
        </NuxtLink>
      </div>
      <!-- </transition-group> -->
  </div>
</template>

<script>
import { get } from 'lodash';
import Cluster from '~/components/Cluster'
import Frame from '~/components/Frame'

export default {
  name: "imagesList",
  components: {
    Cluster,
    Frame
  },
  props: {
    images: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    totalCount: {
      type: Number
    },
    page: {
      type: Number
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
// .images-list, .images-list > *, .images-list > * > * {
//   height: 100%;
// }

$main-height: calc(100vh - 2 * #{spacing(lg)});
// grid layout for big screens
@include respond-to('large') {
  .images-grid {
    position: sticky;
    max-width: 110ch;
    max-height: $main-height;
    display: grid;
    overflow: hidden;
    grid-template-columns: .1fr 3fr .1fr .5fr 2fr;
    grid-template-rows: 2fr repeat(2, .4fr) 1fr 1.5fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .image-link:nth-child(1) {
    grid-area: 1 / 2 / 3 / 4;
    .frame {
      height: 100%;
      width: 100%;
    }
  }
  .image-link:nth-child(2) {
    grid-area: 1 / 5 / 3 / 6;
    .frame {
      height: 100%;
      img {
        align-self: start;
        justify-self: start;
      }
    }
  }
  .image-link:nth-child(3) { grid-area: 4 / 1 / 7 / 3; }
  .image-link:nth-child(4) {
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
.image-title {
  @include smallCaps;
  color: color(light);
  font-weight: 500;
  transition: opacity 750ms ease, color 500ms ease;
  margin-top: 0.5em;
}

.image-link {
  text-decoration: none;
  transition: transform 500ms ease;
  &:hover > .image-title {
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
