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
      :data-orientation="findOrientation(index)"
      :mobile="mobile"
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
    findOrientation(index) {
      return index === 1 || index === 3 ? "portrait" : "landscape"
    },
    beforeEnter: function(el) {
      if (this.goingUp) {
        if (el.dataset.orientation === "portrait") {
          el.style.transform = "translateY(120%)"
        } else {
          el.style.transform = "translateY(200%)"
        }
      } else {
        if (el.dataset.orientation === "portrait") {
          el.style.transform = "translateY(-120%)"
        } else {
          el.style.transform = "translateY(-200%)"
        }
      }
      el.style.transition = "opacity 300 ease, transform 300 ease"
    },
    enter: function(el, done) {
      setTimeout(() => {
        setTimeout(() => {
          el.style.transform = "translateY(0)"
        }, 0)
        done()
      }, 0)
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
// grid layout for big screens
// @include respond-to('large') {
//   .images-grid {
//     display: flex;
//     flex-flow: row wrap;
//     justify-content: space-between;
//     min-height: 570px;
//     height: $main-height;
//     max-width: 1250px;
//     margin: 0 auto;
//     overflow: hidden;
//     margin-bottom: 0px;
//   }
//   .image-link:nth-child(1) {
//     width: 51%;
//     height: 40%;
//     margin-left: 5.5%;
//     display: block;
//     position: relative;
//     align-self: auto;
//     > .image-container {
//       position: absolute;
//       top: 0;
//       right: 0;
//       bottom: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }
//     }
//     &.extraSpace {
//       @include respond-to('large') {
//         visibility: hidden;
//       }
//     }
//   }
//   .image-link:nth-child(2) {
//     width: 29%;
//     height: 58.5%;
//     margin-left: 0px;
//     display: block;
//     position: relative;
//     > .image-container {
//       position: absolute;
//       top: 0;
//       right: 0;
//       bottom: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }
//     }
//   }
//   .image-link:nth-child(3) {
//     width: 51%;
//     height: 40%;
//     margin-top: -48px;
//     display: block;
//     position: relative;
//     &.extra-margin {
//       margin-top: -104px;
//     }
//     > .image-container {
//       position: absolute;
//       top: 0;
//       right: 0;
//       bottom: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }
//     }
//   }
//   .image-link:nth-child(4) {
//     width: 29%;
//     height: 58.5%;
//     margin-left: 0px;
//     margin-top: 75px;
//     display: block;
//     position: relative;
//     > .image-container {
//       position: absolute;
//       top: 0;
//       right: 0;
//       bottom: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }
//     }
//   }
// }
.image-title {
  @include smallCaps;
  color: color(dark);
  font-weight: 300;
  transition: opacity 750ms ease, color 500ms ease;
  margin-top: 0.5em;
  padding-left: 0.5em;
  padding-bottom: 0.5em;
  transition: opacity 750ms ease, color 500ms ease;
  // @include respond-to('large') {
  //   padding: 0;
  // }
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
