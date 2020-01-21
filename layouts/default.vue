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
    handleScroll(event) {
      this.throttledHandlePageChange(event.wheelDelta)
    },
    handlePageChange(change) {
      if (change < 60) {
        this.pageUp()
      }
      if (change > 60) {
        this.pageDown()
      }
      console.log(this.$store.state.pageNumber)
    },
    ...mapActions(['pageUp', 'pageDown', 'unsetPageNumber', 'unsetPages'])
  },
  computed: {
    throttledHandlePageChange() {
      return throttle(this.handlePageChange, 2000)
    }
  },
  watch: {
    $route () {
      this.unsetPageNumber()
      this.unsetPages()
    }
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
