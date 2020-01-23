<template>
  <div class="layout">
    <Stack class="left-sidebar">
      <Navbar />
      <SecondaryNavbar />
    </Stack>
    <main class="main-container">
      <nuxt />
    </main>
    <RightSidebar class="right-sidebar" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { throttle } from 'lodash'
import Navbar from "~/components/Navbar"
import SecondaryNavbar from "~/components/SecondaryNavbar"
import Stack from "~/components/Stack"
import RightSidebar from "~/components/RightSidebar"

export default {
  components: {
    Navbar,
    SecondaryNavbar,
    Stack,
    RightSidebar
  },
  methods: {
    ...mapActions(['unsetPages'])
  },
  watch: {
    $route (newRoute, oldRoute) {
      const matcher = /(about|project|room|service)/
      const isSubChange = newRoute.name.match(matcher) && oldRoute.name.match(matcher)
      if (!isSubChange) {
        this.unsetPages()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.layout {
  padding-top: spacing(lg);
  padding-bottom: spacing(lg);
  position: relative;
  display: flex;
}

a,
a:hover,
a:focus,
a:visited {
  transition: color 500ms ease;
  text-decoration: none;
  color: color(light);
  &:hover {
    color: darken(color(light), 10%);
  }
  &.nuxt-link-exact-active {
    color: color(dark);
  }
}

.main-container {
  flex: 2 1 auto;
  // padding-bottom: $stack-space;
  position: sticky;
  min-height: calc(100vh - 2 * #{spacing(lg)});
  overflow-x: hidden;
  overflow-y: visible;
}
.left-sidebar {
  padding: 0 $stack-space * 3;
  width: 40ch;
  position: sticky;
  top: spacing(lg);
  align-self: flex-start;
  height: auto;
}
.right-sidebar {
  padding: 0 2rem;
  position: sticky;
  top: spacing(lg);
  align-self: flex-start;
  height: auto;
  .right-stack{
    height: 90vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    p {
      @include smallCaps;
      writing-mode: vertical-lr;
    }
  }
}
</style>
