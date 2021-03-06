<template>
  <Stack class="navbar navbar-secondary">
    <ul>
      <template v-if="pagesPrefix === 'services' || pagesPrefix === 'about'">
        <li v-for="(page, index) in sortedPages">
          <nuxt-link
            :id="page.attributes.title"
            :key="page.attributes.title"
            :to="localePath({ name: pagesPrefix, hash: '#' + formatSlug($ta(page.attributes, 'title'))})"
            :class="{ 'nav-item': true, 'title': true, 'anchor': true }"
          >
            {{ $ta(page.attributes, "title") }}
          </nuxt-link>
        </li>
      </template>
    </ul>
  </Stack>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import { get, isEmpty, flatten } from 'lodash'
import Stack from "~/components/Stack"

export default {
  name: "SecondaryNavbar",
  components: {
    Stack
  },
  computed: {
    ...mapState(["pagesPrefix", "anchorItem"]),
    ...mapGetters(["sortedPages"])
  },
  methods: {
    activeAnchor(page) {
      const slug = this.formatSlug(this.$ta(page.attributes, 'title'))
      slug === this.$route.hash.replace('#', '')
    },
    smoothScroll(id) {
      const el = document.querySelector(`#${id}`)
      window.scrollTo({
        top: el.offsetTop,
        behavior: 'smooth'
      });
    },
  },
  watch: {
    anchorItem() {
      if (this.anchorItem && (this.pagesPrefix === 'services' || this.pagesPrefix === 'about')) {
        const currentAnchors = document.querySelectorAll('.anchor')
        currentAnchors.forEach(anchor => {
          anchor.classList.remove('active-anchor')
          anchor.classList.remove('nuxt-link-exact-active')
          anchor.classList.remove('nuxt-link-active')

        })
        const anchorsArray = Array.from(currentAnchors)
        const anchor = anchorsArray.filter(anchor => anchor.hash === "#" + this.anchorItem)
        anchor[0].classList.add('active-anchor')
        anchor[0].classList.add('nuxt-link-exact-active')
        anchor[0].classList.add('nuxt-link-active')
      }
    }
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
