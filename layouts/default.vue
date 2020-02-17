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
$main-height: calc(100vh - 2 * #{spacing(frame)});
.layout {
  padding-top: spacing(frame);
  display: flex;
  flex-direction: column;
  max-width: 160ch;
  margin: 0 auto;
   @include respond-to('large') {
    position: relative;
    flex-direction: initial;
    padding: none;
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
  flex: 2 1 auto;
  overflow-y: visible;
  background: white;
}
.left-sidebar {
  padding: 0 2em;
  width: 100%;
  align-self: flex-start;
  height: auto;
  text-align: right;
  justify-content: space-between;
  @include respond-to('large') {
      // flex: 0 1 25ch;
      width: 25ch;
      text-align: left;
      position: sticky;
      top: spacing(frame);
      min-height: $main-height;
      padding: 0 2em;
  }
}
.right-sidebar {
  @include respond-to('large') {
    position: sticky;
    top: spacing(frame);
    flex: 0 1 5ch;
  }
  .right-stack{
    height: $main-height;
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
    display: flex;
    align-items: center;
    width: 4.5rem;
  }
}
</style>
