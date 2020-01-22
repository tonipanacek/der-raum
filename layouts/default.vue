<template>
  <div class="layout flex">
    <Stack id="left-sidebar">
      <Navbar />
      <SecondaryNavbar />
    </Stack>
    <main class="main-container">
      <nuxt />
    </main>
    <RightSidebar />
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
  margin-top: spacing(lg);
  margin-bottom: spacing(lg);
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
  // position: sticky;
  // height: 90vh;
  // overflow-y: scroll;
}
#left-sidebar {
  padding: 0 $stack-space * 3;
  width: 40ch;
}
#right-sidebar {
  padding: 0 2rem;
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
