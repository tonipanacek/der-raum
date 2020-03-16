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
      :class="{'image-link': true, 'extraSpace': image.index < 0, 'extra-margin': images.length === 3 && index === images.length - 1}"
      :data-index="index"
      :data-total="images.length"
      :mobile="mobile"
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
            {{ title }} {{ page === 0 ? image.index : image.index + (page * 4) - (page * 1) }} / {{ totalCount }}
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
      el.style.transition = "opacity 300 ease, transform 300 ease"
    },
    enter: function(el, done) {
      setTimeout(() => {
        let delay = (parseInt(el.dataset.total) - parseInt(el.dataset.index) - 1) * 150
        if (this.goingUp) {
          delay = parseInt(el.dataset.index) * 150
        }
        setTimeout(() => {
          el.style.opacity = 1
          el.style.transform = "translateY(0)"
        }, delay)
        done()
      }, 350)
    },
    leave: function(el, done) {
      done()
    },
    path(image) {
      if (!image.index) { return '' }
      const slicedImages = this.images.slice(0,3)
      let id = null
      if (this.mobile) {
        id = image.index
      } else {
        id = this.page === 0 ? slicedImages.indexOf(image) + 1 : slicedImages.indexOf(image) + (this.page * 4) - (this.page - 1)
      }
      return this.localePath({
        name: 'projects-slug-images-id',
        params: {
          slug: this.slug,
          id: id
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
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    min-height: 570px;
    height: $main-height;
    max-width: 1250px;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 0px;
  }
  .image-link:nth-child(1) {
    width: 51%;
    height: 40%;
    margin-left: 5.5%;
    display: block;
    position: relative;
    align-self: auto;
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
        visibility: hidden;
      }
    }
  }
  .image-link:nth-child(2) {
    width: 29%;
    height: 58.5%;
    margin-left: 0px;
    display: block;
    position: relative;
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
    width: 51%;
    height: 40%;
    margin-top: -48px;
    display: block;
    position: relative;
    &.extra-margin {
      margin-top: -104px;
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
    width: 29%;
    height: 58.5%;
    margin-left: 0px;
    margin-top: 75px;
    display: block;
    position: relative;
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
}
</style>
