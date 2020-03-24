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
      :class="{'image-link': true, 'extraSpace': image.index < 0, 'extra-margin': images.length === 3 && index === images.length - 1, 'active': hover && hover === image.url, hover: hover }"
      :data-index="index"
      :data-total="images.length"
      :mobile="mobile"
      event=""
      @mouseover.native="handleHover(image)"
      @mouseleave.native="handleBlur"
      @click.native.prevent="handleClick(image, index)"
      >
        <div v-if="mobile" class="frame-wrapper">
          <Frame>
            <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" />
          </Frame>
          <h3 class="image-title">
            {{ title }} {{ sortedImages.indexOf(image.url) + 1 }} / {{ totalCount }}
          </h3>
        </div>
        <div v-else class="image-container">
          <img :src="image.url" :alt="`${title} ${image.index} of ${totalCount}`" />
          <transition name="no-fade">
            <h3 class="image-title">
              {{ title }} {{ sortedImages.indexOf(image.url) + 1 }} / {{ totalCount }}
            </h3>
          </transition>
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
    getTitle(attrs) {
      return get(attrs, 'title', '')
    },
    getImageId(image) {
      return this.$data.pages.indexOf(image) + 1
    },
    handleHover(image) {
      this.hover = image.url
    },
    handleBlur() {
      this.hover = ''
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
      el.classList.add('transition-hide')
      if (this.goingUp) {
        el.style.transform = "translateY(100vh)"
      } else {
        el.style.transform = "translateY(-100vh)"
      }
      el.style.transition = "opacity 300 ease, transform 300 ease"
    },
    enter: function(el, done) {
      setTimeout(() => {
        // let delay = (parseInt(el.dataset.total) - parseInt(el.dataset.index) - 1) * 150
        // if (this.goingUp) {
        //   delay = parseInt(el.dataset.index) * 150
        // }
        setTimeout(() => {
          el.classList.remove('transition-hide')
          el.classList.add('transition-show')
          el.style.transform = "translateY(0)"
        }, 0)
        done()
      }, 0)
      el.classList.remove('transition-show')
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
          id: this.sortedImages.indexOf(image.url) + 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$main-height: calc(100vh - #{spacing(frame)});
.transition-hide {
  // opacity: 0;
}
.transition-show {
  opacity: 1;
}

.no-fade-enter-active, .no-fade-leave-active {
  // transition: opacity .5s;
  opacity: 1;
}
.no-fade-enter, .no-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 1;
}
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
  &:hover .image-title {
    color: color(black);
    font-weight: 600;
  }
  h3 {
    transition: opacity 750ms ease, color 500ms ease;
  }
}

// hovering effect
.hover {
  h3 {
    color: color(black);
    font-weight: 600;
  }
}
.hover:not(.active) {
  opacity: .8;
  h3 {
    color: color(dark);
    font-weight: 400;
  }
}
</style>
