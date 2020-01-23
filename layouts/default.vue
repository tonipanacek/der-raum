<template>
  <div class="layout">
    <Stack class="left-sidebar">
      <Navbar />
      <SecondaryNavbar />
      <SocialIcons />
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
import Cluster from "~/components/Cluster"
import RightSidebar from "~/components/RightSidebar"
import SocialIcons from "~/components/SocialIcons"

export default {
  components: {
    Navbar,
    SecondaryNavbar,
    Stack,
    RightSidebar,
    Cluster,
    SocialIcons
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
  padding: spacing(lg) 0;
  display: flex;
  flex-direction: column;
   @include respond-to('large') {
    flex-direction: initial;
  }
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
  flex: 2 1 50ch;
  padding-bottom: $stack-space;
  position: sticky;
  min-height: 90vh;
  overflow-x: hidden;
  overflow-y: visible;
}
.left-sidebar {
  padding: 0 $stack-space * 3;
  width: 100%;
  position: sticky;
  top: spacing(lg);
  align-self: flex-start;
  height: auto;
  text-align: right;
  justify-content: space-between;
  @include respond-to('large') {
      width: 40ch;
      text-align: left;
      position: sticky;
  }
}
.right-sidebar {
  padding: 0 2rem;
  position: sticky;
  flex: 0 1 5ch;
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
