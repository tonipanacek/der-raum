<template>
  <Stack id="right-sidebar" class="right-sidebar">
    <div class="right-stack small-very">
      <p>
        <nuxt-link :to="switchLocalePath('de')">
          De
        </nuxt-link>
        /
        <nuxt-link :to="switchLocalePath('en')">
          En
        </nuxt-link>
      </p>
      <p>
        <nuxt-link :to="localePath('impressum')">
          {{ $t("rightSidebar.impressum") }}
        </nuxt-link>
        /
        <nuxt-link :to="localePath('privacy')">
          {{ $t("rightSidebar.privacy") }}
        </nuxt-link>
      </p>
    </div>
  </Stack>
</template>

<script>
import Stack from "~/components/Stack"

export default {
  name: "RightSidebar",
  components: {
    Stack
  }
}
</script>

<style lang="scss">
.right-sidebar {
  a,
  a:hover,
  a:focus,
  a:visited {
    transition: color 500ms ease, font-weight 500ms ease;
    text-decoration: none;
    color: color(light);
    &:hover {
      color: darken(color(light), 10%);
    }
    &.nuxt-link-exact-active {
      color: color(dark);
      font-weight: 700;
    }
  }

  padding-right: 2rem;
  .right-stack {
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
