<template>
  <div class="layout flex">
    <Stack id="left-sidebar">
      <Navbar />
    </Stack>
    <main class="main">
      <nuxt />
    </main>
    <Stack id="right-sidebar">
      <div class="right-stack small-very">
        <p>
          <nuxt-link :to="switchLocalePath('de')">
            De
          </nuxt-link> / <nuxt-link :to="switchLocalePath('en')">
            En
          </nuxt-link>
        </p>
        <p>
          <nuxt-link :to="localePath('legal')">
            Legal
          </nuxt-link> / <nuxt-link :to="localePath('privacy')">
            Privacy
          </nuxt-link>
        </p>
      </div>
    </Stack>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Stack from '~/components/Stack.vue';

export default {
  components: {
    Navbar,
    Stack,
  },
};
</script>

<style scoped lang="scss">
.layout {
  margin-top: spacing(lg);
}

a, a:hover, a:focus, a:visited {
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

.main{
  flex-grow: 1;
  padding-bottom: $stack-space;
}
#left-sidebar {
  padding: 0 $stack-space * 3;
  width: 40ch;
}
#right-sidebar {
  padding-right: 2rem;
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
