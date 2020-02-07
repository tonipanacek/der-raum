<template>
  <div class="images-list">
    <transition-group
      name="insert"
      tag="div"
      class="images-grid"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <NuxtLink
      :id="title"
      v-for="(image, index) in images"
      :key="image.url"
      :to="path(image)"
      :class="{'image-link': true, 'extraSpace': image.index < 0}"
      :data-index="index"
      :data-total="images.length"
      event=""
      @click.native.prevent="handleClick(image, index)"
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
    </transition-group>
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
    handleClick(image, index) {
      if (index > 2) {
        this.$emit('increment')
      } else {
        const path = this.path(image)
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
        let delay = parseInt(el.dataset.index) * 200
        if (this.goingUp) {
          delay = (parseInt(el.dataset.total) - parseInt(el.dataset.index) - 1) * 200
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
    path(image) {
      if (!image.index) { return '' }
      return this.localePath({
        name: 'projects-slug-images-id',
        params: {
          slug: this.slug,
          id: this.allImages.indexOf(image.url) + 1
        }
      })
    }
  }
}
// {{ page === 0 ? image.index : image.index + (page * 4) - (page * 1) }}
</script>

<style lang="scss" scoped>
$main-height: calc(100vh - #{spacing(frame)});
// grid layout for big screens
@include respond-to('large') {
  .images-grid {
    max-height: $main-height;
    max-width: 100ch;
    margin: 0 auto;
    display: grid;
    overflow-y: hidden;
    grid-template-columns: .3fr 3fr .3fr .5fr 2fr;
    // grid-template-rows: 2fr repeat(2, .4fr) 1fr 1.5fr;
    grid-template-rows: 2fr .2fr 1.2fr .6fr 1.5fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .image-link:nth-child(1) {
    grid-area: 1 / 2 / 3 / 4;
    align-self: stretch;
    &.extraSpace {
      @include respond-to('large') {
        display: none;
      }
    }
  }
  .image-link:nth-child(2) {
    grid-area: 1 / 5 / 4 / 6;
    .frame {
      height: 100%;
    }
  }
  .image-link:nth-child(3) {
    grid-area: 4 / 1 / 7 / 3;
    align-self: end;
   }
  .image-link:nth-child(4) {
    grid-area: 5 / 5 / 7 / 6;
    .frame {
      height: 100%;
    }
  }
}
.image-title {
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

.image-link {
  text-decoration: none;
  transition: transform 500ms ease;
  &:hover > .image-title {
    color: color(dark);
  }
  &:nth-child(4) {
    @include respond-to('large') {
      h3 {
        opacity: 0;
      }
    }
  }
}
</style>
