<template>
  <div class="layout">
    <Stack class="left-sidebar">
      <Navbar />
      <!-- <SecondaryNavbar /> -->
      <SocialIcons id="left-social" />
    </Stack>
    <section role="main" class="main-container">
      <nuxt />
    </section>
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
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://www.der-raum.de' + this.$route.path
        }
      ]
    }
  },
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

.page-enter-active, .page-leave-active {
  transition: opacity .3s ease-in-out;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transition: opacity .3s ease;
}

$main-height: calc(100vh - 2 * #{spacing(frame)});
.layout {
  // padding-top: spacing(frame);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  // @supports (display: grid) {
  //   max-width: 2000px;
  // }
  //  @include respond-to('large') {
  //   position: relative;
  //   flex-direction: initial;
  //   padding: none;
  //   height: inherit;
  // }
}
a,
a:focus,
a:visited {
  transition: color 500ms ease;
  text-decoration: none;
  color: color(light);
  font-weight: 300;
  &:hover {
    color: color(black);
    font-weight: 400;
  }
  &.nuxt-link-exact-active {
    color: color(dark);
  }
}

.main-container {
  flex: 2 1 auto;
  overflow-y: hidden;
  max-width: 1250px;
  width: 100%;
  height: 100%;
  background: white;
  margin: 0 auto;
  padding: 0 9em;
  // margin: 0 auto;
  // @include respond-to('large') {
  //   width: 500px;
  //   max-width: 1250px;
  //   overflow-y: visible;
  //   // max-height: $main-height;
  // }
}

// .mt-lg {
//   margin-top: spacing(lg);
  // @include respond-to('large') {
  //   margin-top: 0;
  // }
// }

.sidebar-wrapper {
  display: flex;
  flex-direction: column;
}
.left-sidebar {
  padding: 2em 2em 1em 2em;
  position: sticky;
  top: 0em;
  width: 100%;
  align-self: flex-start;
  height: auto;
  text-align: right;
  justify-content: space-between;
  // @include respond-to('large') {
  //   width: 300px;
  //   text-align: left;
  //   height: $main-height;
  //   min-height: $main-height;
  //   padding: 0 2em;
  //   margin-bottom: 2em;
  //   @supports (position: sticky) {
  //     position: sticky;
  //     top: spacing(frame);
  //   }
  // }
}

#left-social {
  display: none;
  // @include respond-to('large') {
  //   display: flex;
  //   align-items: center;
  //   width: 4.5rem;
  //   height: 1rem;
  // }
}

.right-sidebar {
  // @include respond-to('large') {
  //   @supports (position: sticky) {
  //     position: sticky;
  //     top: spacing(frame);
  //   }
  // }
}
</style>
