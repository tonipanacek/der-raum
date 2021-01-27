<template>
  <div id="images-grid">
    <NuxtLink
    :id="title"
    v-for="(image, index) in imagesWithUrls"
    :key="image.url"
    :to="path(image)"
    :class="{ 'image-link': true, 'portrait': findOrientation(index) === 'portrait' }"
    :data-index="index"
    :data-total="images.length"
    :data-orientation="findOrientation(index)"
    :mobile="mobile"
    event=""
    @click.native.prevent="handleClick(image)"
    >
      <div class="frame-wrapper">
        <Frame :n="findOrientation(index) === 'portrait' ? 11 : 9" :d="findOrientation(index) === 'portrait' ? 9 : 16">
          <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" loading="lazy"/>
        </Frame>
        <p class="image-title">
          {{ title }} <span id="image-count">{{ images.indexOf(image.url) + 1 }} / {{ totalCount }}</span>
        </p>
      </div>
<!--       <div v-else class="image-container">
        <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" />
        <transition name="no-fade">
          <p class="image-title">
            {{ title }} <span id="image-count">{{ images.indexOf(image.url) + 1 }} / {{ totalCount }}</span>
          </p>
        </transition>
      </div> -->
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
    imagesWithUrls: {
      type: Array,
      required: true
    },
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
    mobile: Boolean
  },
  methods: {
    path(image) {
      if (!image.index) { return '' }
      return this.localePath({
        name: 'projects-slug-images-id',
        params: {
          slug: this.slug,
          id: this.images.indexOf(image.url) + 1
        }
      })
    },
    handleClick(project) {
      const path = this.path(project)
      this.$router.push(path)
    },
    findOrientation(index) {
      return index % 2 === 1 ? "portrait" : "landscape"
    },
  }
}
</script>

<style lang="scss" scoped>
$main-height: calc(100vh - #{spacing(frame)});

#images-grid {
  @include respond-to('large') {
    display: grid;
    column-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: fit-content(260px);
    grid-auto-flow: row dense;
    .image-link:first-child {
      grid-column: span 2;
      grid-row: span 2;
    }
    .portrait {
      grid-row: span 2;
    }
  }
}

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
