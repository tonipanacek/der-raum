<template>
  <div class="images-list">
    <div class="images-grid">
      <NuxtLink
      :id="title"
      v-for="image in images"
      :key="image.url"
      :to="path(image)"
      class="image-link"
      >
        <Frame v-if="image.index % 2" :n="9" :d="16">
          <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" />
        </Frame>
        <Frame v-else :n="4" :d="3">
          <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" />
        </Frame>
        <h3 class="image-title">
          {{ title }} {{ allImages.indexOf(image.url) + 1 }} / {{ totalCount }}
        </h3>
      </NuxtLink>
    </div>
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
    allImages: {
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
    },
    getImageId(image) {
      return this.$data.pages.indexOf(image) + 1
    },
    path(image) {
      if (!image.index) { return '' }
      return this.localePath({
        name: 'projects-slug-images-id',
        params: {
          slug: this.slug,
          id: image.index
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// .images-list, .images-list > *, .images-list > * > * {
//   height: 100%;
// }

$main-height: calc(100vh - #{spacing(frame)});
// grid layout for big screens
@include respond-to('large') {
  .images-grid {
    max-width: 110ch;
    max-height: $main-height;
    display: grid;
    overflow: hidden;
    grid-template-columns: .3fr 3fr .3fr .5fr 2fr;
    grid-template-rows: 2fr repeat(2, .4fr) 1fr 1.5fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .image-link:nth-child(1) {
    grid-area: 1 / 2 / 3 / 4;
    align-self: stretch;
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
  .image-link:nth-child(3) {
    grid-area: 4 / 1 / 7 / 3;
    align-self: end;
    .frame {
      height: 100%;
      width: 100%;
    }
   }
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
</style>
