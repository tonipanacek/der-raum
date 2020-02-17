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
        <div v-if="mobile" class="frame-wrapper">
          <Frame>
            <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" />
          </Frame>
          <h3 class="image-title">
            {{ title }} {{ allImages.indexOf(image.url) + 1 }} / {{ totalCount }}
          </h3>
        </div>
        <div v-else class="image-container">
          <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" />
          <h3 class="image-title">
            {{ title }} {{ allImages.indexOf(image.url) + 1 }} / {{ totalCount }}
          </h3>
        </div>
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
    goingUp: Boolean,
    mobile: Boolean
  },
  methods: {
    getTitle(attrs) {
      return get(attrs, 'title', '')
    },
    getImageId(image) {
      return this.$data.pages.indexOf(image) + 1
    },
    handleClick(image, index) {
      if (index > 2 && !this.mobile) {
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
        let delay = (parseInt(el.dataset.total) - parseInt(el.dataset.index) - 1) * 200
        if (this.goingUp) {
          delay = parseInt(el.dataset.index) * 200
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
          id: this.page === 0 ? image.index : image.index + (this.page * 4) - (this.page * 1)
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
    min-height: 500px;
    height: $main-height;
    max-width: 110ch;
    margin: 0 auto;
    display: grid;
    overflow: hidden;
    grid-template-columns: minmax(0, .3fr) minmax(0, 2.5fr) minmax(0, .3fr) minmax(0, .8fr) minmax(0, 1.6fr);
    grid-template-rows: minmax(0, 2.1fr) minmax(0, .4fr) minmax(0, .8fr) minmax(0, .4fr) minmax(0, 2.1fr) minmax(0, 0.5fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .image-link:nth-child(1) {
    grid-area: 1 / 2 / 3 / 4;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
    &:before {
      display: block;
      content: "";
      width: 100%;
      padding-top: (16 / 9) * 100%;
    }
    > .image-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &.extraSpace {
      @include respond-to('large') {
        display: none;
      }
    }
  }
  .image-link:nth-child(2) {
    grid-area: 1 / 5 / 5 / 6;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
    align-self: end;
    &:before {
      display: block;
      content: "";
      width: 100%;
      padding-top: (9 / 16) * 100%;
    }
    > .image-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .image-link:nth-child(3) {
    grid-area: 4 / 1 / 6 / 3;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
    &:before {
      display: block;
      content: "";
      width: 100%;
      padding-top: (16 / 9) * 100%;
    }
    > .image-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .image-link:nth-child(4) {
    grid-area: 5 / 5 / 7 / 6;
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-top: 75px;
    &:before {
      display: block;
      content: "";
      width: 100%;
      padding-top: (9 / 16) * 100%;
    }
    > .image-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
.image-title {
  @include smallCaps;
  color: color(dark);
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
  transition: transform 500ms ease, opacity 0.3s ease-in-out;
  &:hover > .image-title {
    color: color(black);
    font-weight: 600;
  }
  h3 {
    transition: opacity 750ms ease, color 500ms ease;
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
