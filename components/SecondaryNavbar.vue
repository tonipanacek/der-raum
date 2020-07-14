<template>
  <Stack class="navbar navbar-secondary">
    <ul>
      <template v-if="pagesPrefix === 'services' || pagesPrefix === 'about'">
        <li v-for="(page, index) in sortedPages">
          <nuxt-link
            :id="page.attributes.title"
            :key="page.attributes.title"
            :to="localePath({ name: pagesPrefix, hash: '#' + formatSlug($ta(page.attributes, 'title'))})"
            :class="{ 'active': hover, hover: hover, 'nav-item': true, 'title': true }"
          >
            {{ $ta(page.attributes, "title") }}
          </nuxt-link>
        </li>
      </template>
      <template v-else>
        <li
        v-for="(page, index) in sortedPages"
        :key="$ta(page.attributes, 'title') + $i18n.locale"
        :data-index="index"
        >
          <nuxt-link
            :class="{
              'nav-item': true,
              'title': true,
              'hovered': hoveredMenuItem === $ta(page.attributes, 'title')
            }"
            :to="path(page)"
            @mouseover.native="handleHover($ta(page.attributes, 'title'))"
            @mouseleave.native="handleBlur"
          >
            {{ $ta(page.attributes, "title") }}
          </nuxt-link>
        </li>
      </template>
      <li
        v-if="this.pageNumber < this.lastPage && this.pagesPrefix.match(/projekte|projects|rooms|raume/)"
        :class="{
          'nav-item': true,
          'title': true,
          'more': true,
          'hovered': hoveredMenuItem === 'more'
        }"
        key="more"
        @click="handleClick"
        @mouseover="handleHover('more')"
        @mouseleave="handleBlur"
      >
        {{ $t("more_button")}}+
      </li>
    </ul>
  </Stack>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import { get, isEmpty } from 'lodash'
import Stack from "~/components/Stack"

export default {
  name: "SecondaryNavbar",
  components: {
    Stack
  },
  computed: {
    ...mapState(["pagesPrefix", "hoveredMenuItem", "pageNumber", "lastPage"]),
    ...mapGetters(["sortedPages"])
  },
  methods: {
    activeAnchorLink(page) {
      const slug = this.formatSlug(this.$ta(page.attributes, 'title'))
      console.log(slug)
      slug === 'team'
      // this.$route.hash.replace('#', '') === slug
      // this.$route.hash === '#team'
      // console.log(this.$route)
    },
    path(page) {
      const slug = this.formatSlug(this.$ta(page.attributes, 'title'))
      if (this.pagesPrefix !== 'services' || this.pagesPrefix !== 'about') {
        // return this.localePath({
        //   name: `${this.pagesPrefix}-slug`,
        //   params: {
        //     slug
        //   }
        // })
        return slug
      } else {
        return this.localePath({
          name: `${this.pagesPrefix}-slug`,
          params: {
            slug
          }
        })
      }
    },
    beforeEnter: function(el) {
      el.style.opacity = 0
      el.style.transform = "translateY(-50%)"
      el.style.transition = "opacity 200ms ease, transform 200ms ease"
    },
    enter: function(el, done) {
      setTimeout(() => {
        el.style.opacity = 1
        el.style.transform = "translateY(0)"
        done()
      }, 50)
    },
    leave: function(el, done) {
      el.style.opacity = 0
      el.style.transform = "translateY(50%)"
      setTimeout(() => {
        done()
      }, 50)
    },
    handleHover(title) {
      this.setHoveredMenuItem(title)
    },
    handleBlur() {
      this.unsetHoveredMenuItem()
    },
    handleClick() {
      this.incrementPageNumber()
    },
    ...mapActions(['setHoveredMenuItem', 'unsetHoveredMenuItem', 'incrementPageNumber'])
  }
}
</script>

<style lang="scss">
// Covered by Navbar component
.navbar-secondary {
  width: 100%;
  top: 0;
  display: none;
  flex-grow: 2;
  margin-top: spacing(lg);
  ul {
    padding-left: 0;
  }
  @include respond-to('large') {
    display: block;
  }
  .hovered {
    color: color(dark);
    font-weight: 900;
  }
  .more {
    cursor: pointer;
  }
  .active-anchor {
    font-weight: 900;
    color: color(black);
  }
}
</style>
