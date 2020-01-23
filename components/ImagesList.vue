<template>
  <div class="images-list">
    <Cluster>
      <transition-group
      name="insert"
      mode="out-in"
      tag="div"
      >
        <NuxtLink
        :id="title"
        v-for="image in images"
        :key="image.url"
        :to="`/pages/${formatSlug(title)}/images/${image.index}`"
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

export default {
  name: "imagesList",
  components: {
    Cluster
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
    totalCount: {
      type: Number
    }
  },
  methods: {
    getTitle(attrs) {
      return get(attrs, 'title', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.image-title {
  @include smallCaps;
  color: color(light);
  font-weight: 600;
}
.image-link {
  text-decoration: none;
  display: block;
}
img {
  max-height: calc(40vh - 3rem);
}
// Transition
.insert-enter {
  opacity: 0;
}
.insert-leave-to {
  opacity: 0;
  transition: translateY(25%);
}
.insert-enter-active {
  transition: opacity 750ms ease 500ms, transform 750ms ease 500ms;
}
.insert-leave-active {
  position: absolute;
  transition: opacity 500ms ease, transform 500ms ease;
}
.insert-move {
  transition: transform 750ms ease;
  z-index: 100;
}
</style>
