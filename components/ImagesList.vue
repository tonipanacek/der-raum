<template>
  <div class="images-list">
    <NuxtLink
    :id="title"
    v-for="(image, index) in images"
    :key="image.url"
    :to="path(image)"
    :class="{'image-link': true, 'extraSpace': image.index < 0, 'extra-margin': images.length === 3 && index === images.length - 1, 'active': hover && hover === image.url, hover: hover }"
    :data-index="index"
    :data-total="images.length"
    :data-orientation="findOrientation(index)"
    :mobile="mobile"
    event=""
    @mouseover.native="handleHover(image)"
    @mouseleave.native="handleBlur"
    @click.native.prevent="handleClick(image, index)"
    >
      <div v-if="mobile" class="frame-wrapper">
        <Frame>
          <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" loading="lazy"/>
        </Frame>
        <p class="image-title">
          {{ title }} <span id="image-count">{{ sortedImages.indexOf(image.url) + 1 }} / {{ totalCount }}</span>
        </p>
      </div>
      <div v-else class="image-container">
        <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" />
        <transition name="no-fade">
          <p class="image-title">
            {{ title }} <span id="image-count">{{ sortedImages.indexOf(image.url) + 1 }} / {{ totalCount }}</span>
          </p>
        </transition>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import { get } from 'lodash';
import Frame from '~/components/Frame'

export default {
  name: "imagesList",
  components: {
    Frame
  },
  props: {
    images: {
      type: Array,
      required: true
    },
    sortedImages: {
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
    goingUp: Boolean,
    mobile: Boolean
  },
  data() {
    return {
      hover: ''
    }
  },
  methods: {
    handleHover(image) {
      this.hover = image.url
    },
    handleBlur() {
      this.hover = ''
    },
    findOrientation(index) {
      return index === 1 || index === 3 ? "portrait" : "landscape"
    },
    path(image) {
      if (!image.index) { return '' }
      return this.localePath({
        name: 'projects-slug-images-id',
        params: {
          slug: this.slug,
          id: this.sortedImages.indexOf(image.url) + 1
        }
      })
    },
    handleClick(project, index) {
      if (index > 2 && !this.mobile) {
        this.$emit('increment')
      } else {
        const path = this.path(project)
        this.$router.push(path)
      }
    },
    orientation(image) {
      if(!image) { return '' }
      return image.orientation
    }
  }
}
</script>

<style lang="scss" scoped>
$main-height: calc(100vh - #{spacing(frame)});
.image-title {
  @include smallCaps;
  color: color(dark);
  font-weight: 300;
  transition: opacity 750ms ease, color 500ms ease;
  margin-top: 0.5em;
  padding-left: 0.5em;
  padding-bottom: 0.5em;
  transition: opacity 750ms ease, color 500ms ease;
  @include respond-to('large') {
    padding: 0;
  }
}

.image-link {
  text-decoration: none;
  transition: transform 650ms ease, opacity 0.3s ease-in-out;
  &:hover .image-title {
    color: color(dark);
    font-weight: 900;
  }
  @media(hover: hover) and (pointer: fine) {
    &:hover .image-title {
      color: color(dark);
      font-weight: 900;
    }
  }
}
#image-count {
  padding-left: .75em;
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
