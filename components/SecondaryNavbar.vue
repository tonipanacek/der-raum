<template>
  <Stack class="navbar navbar-secondary">
    <transition-group
      name="insert"
      tag="ul"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <li
        v-for="(page, index) in sortedPages"
        :key="page.attributes.title"
        :data-index="index"
      >
        <nuxt-link
          class="nav-item title link"
          :to="path(page)"
        >
          {{ $ta(page.attributes, "title") }}
        </nuxt-link>
      </li>
    </transition-group>
  </Stack>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import { get } from 'lodash'
import Stack from "~/components/Stack"

export default {
  name: "SecondaryNavbar",
  components: {
    Stack
  },
  computed: {
    ...mapState(["pagesPrefix"]),
    ...mapGetters(["sortedPages"])
  },
  methods: {
    path(page) {
      const slug = this.formatSlug(get(page, "attributes.title", ""))
      return this.localePath({
        name: `${this.pagesPrefix}-slug`,
        params: {
          slug
        }
      })
    },
    beforeEnter: function(el) {
      el.style.opacity = 0
      el.style.transform = "translateY(-50%)"
      el.style.transition = "opacity 500ms ease, transform 500ms ease"
    },
    enter: function(el, done) {
      setTimeout(() => {
        const delay = parseInt(el.dataset.index) * 250
        setTimeout(() => {
          el.style.opacity = 1
          el.style.transform = "translateY(0)"
        }, delay)
        done()
      }, 1000)
    },
    leave: function(el, done) {
      el.style.opacity = 0
      el.style.transform = "translateY(50%)"
      setTimeout(() => {
        done()
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
// Covered by Navbar component
.navbar-secondary {
  top: 0;
  width: 30ch;
  display: none;
  flex-grow: 2;
  @include respond-to('large') {
      display: block;
  }
}
.insert-move {
  transition: transform 750ms ease;
  z-index: 100;
}
.insert-leave-active {
  position: absolute;
}
</style>
