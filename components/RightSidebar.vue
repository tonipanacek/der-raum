<template>
  <Stack id="right-sidebar" class="right-sidebar">
    <SocialIcons id="right-social"/>
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
import SocialIcons from "~/components/SocialIcons"

export default {
  name: "RightSidebar",
  components: {
    Stack,
    SocialIcons
  }
}
</script>

<style lang="scss">
$main-height: calc(100vh - 2 * #{spacing(lg)});
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
  background: white;
  padding-right: 2rem;
  width: 100%;
  .right-stack {
    display: flex;
    justify-content: space-between;
    flex-direction: initial;
    p {
      @include smallCaps;
      font-size: 1em;
      writing-mode: horizontal-tb;
    }
  }
}
@include respond-to('large') {
  .right-sidebar {
    width: 7rem;
    .right-stack {
      min-height: $main-height;
      flex-direction: column;
      p {
        writing-mode: vertical-lr;
      }
    }
  }
}
#right-social {
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: none;
  @include respond-to('large') {
    display: none;
  }
}
</style>
