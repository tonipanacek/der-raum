<template>
  <div class="images-list">
    <Cluster>
      <transition-group
      name="insert"
      mode="out-in"
      tag="div"
      :class="{ 'images-grid': true, 'going-up': goingUp, 'going-down': !goingUp }"
      >
        <NuxtLink
        :id="title"
        v-for="image in images"
        :key="image.url"
        :to="`/projects/${slug}/images/${image.index}`"
        class="image-link"
        >
          <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" />
          <h3 class="image-title">
            {{ title }} {{ image.index }} / {{ totalCount }}
          </h3>
        </NuxtLink>
      </transition-group>
    </Cluster>
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
.images-list, .images-list > *, .images-list > * > * {
  height: 100%;
}

.images-grid {
  @include respond-to(large) {
    display: grid;
    grid-gap: spacing(sm);
    justify-content: space-between;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: row dense;
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

.image-title {
  @include smallCaps;
  color: color(light);
  font-weight: 500;
  transition: 500ms color ease;
}
.image-link {
  text-decoration: none;
  transition: transform 500ms ease;
  &:hover > .image-title {
    color: color(dark);
  }
  img {
    width: auto;
    max-height: calc(100% - #{spacing(sm) * 2});
  }
  h3 {
    transition: opacity 750ms ease, color 500ms ease;
    margin: .75em;
  }
  &:nth-child(4) {
    pointer-events: none;
    h3 {
      opacity: 0;
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
