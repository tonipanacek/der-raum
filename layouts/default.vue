<template>
  <div class="layout flex">
    <Stack id="left-sidebar">
      <Navbar />
      <SecondaryNavbar />
    </Stack>
    <main class="main-container" @mousewheel="handleScroll">
      <nuxt />
    </main>
    <RightSidebar />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    async handleScroll(event) {
      const element = event.target;
      if (event.wheelDelta < 90) {
        this.pageUp()
      } else if (event.wheelDelta > 90) {
        this.pageDown()
      }
    },
    ...mapActions(['pageUp', 'pageDown'])
  }
}
</script>

<style scoped lang="scss">
.layout {
  margin-top: spacing(lg);
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
  height: 90vh;
  overflow-y: scroll;
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
