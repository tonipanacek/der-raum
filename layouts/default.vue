<template>
  <div class="layout">
    <Stack class="left-sidebar">
      <Navbar />
      <SecondaryNavbar />
      <SocialIcons id="left-social" />
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
import SocialIcons from "~/components/SocialIcons"

export default {
  components: {
    Navbar,
    SecondaryNavbar,
    Stack,
    RightSidebar,
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

$main-height: calc(100vh - 2 * #{spacing(lg)});
.main-container {
  flex: 2 1 auto;
  position: sticky;
  overflow-x: hidden;
  overflow-y: visible;
  background: white;
  z-index: 2;
  margin-left: auto;
  margin-right: auto;
  max-width: 110ch;
  min-height: $main-height;
}
.left-sidebar {
  padding: 0 2em;
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
      min-height: $main-height;
      padding: 0 $stack-space * 3;
  }
}
.right-sidebar {
  padding: 0 2em;
  position: sticky;
  flex: 0 1 5ch;
  align-self: flex-start;
  height: auto;
  .right-stack{
    min-height: $main-height;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    p {
      @include smallCaps;
      writing-mode: vertical-lr;
      transform: translateY(50%);
    }
  }
}

#left-social {
  display: none;
  @include respond-to('large') {
    display: block;
  }
}
</style>
